// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Dropdown,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from 'antd';
import { TeamOutlined, DollarOutlined, SwapOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useFlightStore } from '@/lib/store/flight-store';

interface Airport {
  id: string;
  name: string;
  abv: string;
  city: string;
}
import HeaderComponent from '@/components/layout/Header';
import PassengerField from '@/components/forms/PassengerField';
import CabinField from '@/components/forms/CabinField';
import HomeInfo1 from '@/components/forms/SearchForm';
import HomeFooter from '@/components/layout/Footer';

dayjs.extend(customParseFormat);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://be-java-master-production.up.railway.app';

interface AirportResponse {
  data?: {
    airports?: Airport[];
  };
}

export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const {
    airports,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    trip,
    seat,
    cabin,
    isModalOpen,
    isLoading,
    setAirports,
    setFromAirport,
    setToAirport,
    setDepartureDate,
    setReturnDate,
    setTrip,
    setSeat,
    setCabin,
    setModalOpen,
    setLoading,
    swapAirports,
  } = useFlightStore();

  const [airportDetails, setAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [fromAirportDetails, setFromAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [toAirportDetails, setToAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [isClicked, setIsClicked] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // Fetch airports
  useEffect(() => {
    const fetchAirports = async () => {
      if (!session?.user) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/airport`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch airports');
        }

        const responseJson: AirportResponse = await response.json();
        const airportsData = responseJson.data?.airports || [];
        
        setAirports(airportsData);
        
        const details = airportsData.map((val: Airport) => ({
          label: val.name || '',
          value: val.id || '',
        }));
        
        setAirportDetails(details);
        setFromAirportDetails(details);
        setToAirportDetails(details);
      } catch (error) {
        console.error('Error fetching airports:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session && airports.length === 0) {
      fetchAirports();
    }
  }, [session, airports.length, setAirports, setLoading]);

  // Update airport details when airports change
  useEffect(() => {
    if (airports.length > 0) {
      const details = airports.map((val: Airport) => ({
        label: val.name,
        value: val.id,
      }));
      setAirportDetails(details);
      setFromAirportDetails(details);
      setToAirportDetails(details);
    }
  }, [airports]);

  const dateFormat = 'dddd, DD MMM YYYY';
  const customFormat: DatePickerProps['format'] = (value) =>
    value.format(dateFormat);

  const onDepartureDatePick: DatePickerProps['onChange'] = (date) => {
    if (date) setDepartureDate(date);
  };

  const onReturnDatePick: DatePickerProps['onChange'] = (date) => {
    if (date) setReturnDate(date);
  };

  const fromChange = (value: string) => {
    const airport = airports.find((obj: Airport) => obj.id === value);
    if (airport) setFromAirport(airport);
  };

  const toChange = (value: string) => {
    const airport = airports.find((obj: Airport) => obj.id === value);
    if (airport) setToAirport(airport);
  };

  const fromSearch = (value: string) => {
    setFromAirportDetails(
      airportDetails.filter((obj: { label: string; value: string }) =>
        obj.label.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const toSearch = (value: string) => {
    setToAirportDetails(
      airportDetails.filter((obj: { label: string; value: string }) =>
        obj.label.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (e: RadioChangeEvent) => {
    setTrip(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const handleSearch = () => {
    if (fromAirport && toAirport) {
      setModalOpen(true);
    }
  };

  const navigateToResults = (daysToAdd = 0) => {
    const searchParams = new URLSearchParams({
      trip,
      cabin: cabin.toString(),
      fromAirportId: fromAirport?.id || '',
      toAirportId: toAirport?.id || '',
      departureDate: departureDate.add(daysToAdd, 'day').format('YYYY-MM-DD'),
      returnDate: returnDate.format('YYYY-MM-DD'),
      adults: seat.get('adults')?.toString() || '1',
      children: seat.get('children')?.toString() || '0',
      infant: seat.get('infant')?.toString() || '0',
    });
    
    router.push(`/results?${searchParams.toString()}`);
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#38A993',
          borderRadius: 2,
          colorPrimaryTextHover: '#38A993',
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <HeaderComponent />
        
        <main>
          {/* Hero Section */}
          <div className="relative">
            <Image
              src="/assets/Illustration.svg"
              alt="Flight illustration"
              width={1200}
              height={400}
              className="w-full h-auto"
              priority
            />
            <div className="absolute w-full m-auto -bottom-[10%] snap-center self-center text-center">
              <div className="p-6 bg-white rounded-[20px] shadow border border-gray-200 flex-col justify-center items-start gap-6 inline-flex">
                {/* Trip Type and Options */}
                <div className="self-stretch justify-start items-center gap-6 inline-flex">
                  <div className="justify-start items-start gap-9 flex">
                    <Radio.Group
                      buttonStyle="outline"
                      size="large"
                      className="text-primary"
                      value={trip}
                      onChange={onChange}
                    >
                      <Radio value="one-way">
                        <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                          One - Way
                        </p>
                      </Radio>
                      <Radio value="round">
                        <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                          Round Trip
                        </p>
                      </Radio>
                    </Radio.Group>
                    <Divider type="vertical" className="h-6" />

                    <Dropdown
                      trigger={['click']}
                      className="gap-4 flex"
                      dropdownRender={() => (
                        <PassengerField
                          seats={seat}
                          onChange={setSeat}
                        />
                      )}
                    >
                      <a
                        className={`hover:text-primary ${
                          isClicked ? 'clicked' : ''
                        }`}
                        onClick={handleButtonClick}
                      >
                        <Space>
                          <TeamOutlined style={{ fontSize: 24 }} />
                          <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                            Seats
                          </div>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Space>
                      </a>
                    </Dropdown>

                    <Dropdown
                      trigger={['click']}
                      className="gap-4 flex"
                      dropdownRender={() => (
                        <CabinField
                          chosen={cabin}
                          onChange={setCabin}
                        />
                      )}
                    >
                      <a
                        className={`hover:text-primary ${
                          isClicked ? 'clicked' : ''
                        }`}
                        onClick={handleButtonClick}
                      >
                        <Space>
                          <DollarOutlined style={{ fontSize: 24 }} />
                          <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                            {cabin === 0 ? (
                              <>Economy</>
                            ) : cabin === 1 ? (
                              <>Business</>
                            ) : (
                              <>First</>
                            )}
                          </div>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>

                {/* Search Form */}
                <div className="self-stretch justify-start items-center gap-6 inline-flex">
                  <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                    <div className="justify-center items-center gap-2 flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                          <div className="text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                            From
                          </div>
                        </div>
                        <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                          <Select
                            showSearch
                            bordered={false}
                            title="Where From"
                            placeholder="Where From ?"
                            dropdownStyle={{
                              backgroundColor: "white",
                              width: "fit-content",
                              padding: "24px",
                            }}
                            style={{
                              color: "white",
                              borderColor: "transparent",
                              border: "0px solid",
                              backgroundColor: "transparent",
                            }}
                            value={fromAirport?.name || null}
                            optionFilterProp="children"
                            onChange={fromChange}
                            onSearch={fromSearch}
                            filterOption={filterOption}
                            options={fromAirportDetails}
                            loading={isLoading}
                            optionRender={(option) => {
                              const airport = airports.find((a: Airport) => a.id === option.value);
                              return airport ? (
                                <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                      {airport.city}, Indonesia
                                    </div>
                                    <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                      {airport.name}
                                    </div>
                                  </div>
                                  <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                    <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                      {airport.abv}
                                    </div>
                                  </div>
                                </div>
                              ) : null;
                            }}
                            notFoundContent={
                              <Image
                                src="/assets/not-found.svg"
                                alt="Not found"
                                width={430}
                                height={200}
                                className="p-8 w-[430px]"
                              />
                            }
                          />
                        </div>
                      </div>
                      <Button
                        onClick={swapAirports}
                        type="primary"
                        style={{ backgroundColor: "#38A993" }}
                        shape="circle"
                        icon={<SwapOutlined />}
                        size="large"
                      />
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                          <div className="text-neutral text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                            To
                          </div>
                        </div>
                        <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                          <Select
                            bordered={false}
                            title="To"
                            dropdownStyle={{
                              backgroundColor: "white",
                              padding: "24px",
                              width: "fit-content",
                            }}
                            value={toAirport?.name || null}
                            showSearch
                            placeholder="Where To ?"
                            optionFilterProp="children"
                            onChange={toChange}
                            onSearch={toSearch}
                            style={{
                              color: "white",
                              borderColor: "transparent",
                              border: "0px solid",
                              backgroundColor: "transparent",
                            }}
                            notFoundContent={
                              <Image
                                src="/assets/not-found.svg"
                                alt="Not found"
                                width={430}
                                height={200}
                                className="p-4 w-[430px]"
                              />
                            }
                            options={toAirportDetails}
                            filterOption={filterOption}
                            loading={isLoading}
                            optionRender={(option) => {
                              const airport = airports.find((a: Airport) => a.id === option.value);
                              return airport ? (
                                <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                      {airport.city}, Indonesia
                                    </div>
                                    <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                      {airport.name}
                                    </div>
                                  </div>
                                  <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                    <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                      {airport.abv}
                                    </div>
                                  </div>
                                </div>
                              ) : null;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {trip === "one-way" ? (
                      <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                              Departure Date
                            </div>
                          </div>
                          <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">
                            <DatePicker
                              onChange={onDepartureDatePick}
                              disabledDate={(d) => {
                                return (
                                  d.isBefore(dayjs().add(-1, "day")) ||
                                  d.isAfter(dayjs().add(2, "month"))
                                );
                              }}
                              style={{ width: "100%" }}
                              className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                              bordered={false}
                              format={customFormat}
                              value={departureDate}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-row">
                        <div className="grow shrink basis-0 flex-col justify-start items-start mr-3 gap-2 inline-flex">
                          <div className="bg-white justify-start items-start inline-flex">
                            <div className="text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                              Departure Date
                            </div>
                          </div>
                          <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                            <DatePicker
                              disabledDate={(d) => {
                                return (
                                  d.isBefore(dayjs().add(-1, "day")) ||
                                  d.isAfter(dayjs().add(2, "month"))
                                );
                              }}
                              onChange={onDepartureDatePick}
                              style={{ width: "100%" }}
                              className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                              bordered={false}
                              format={customFormat}
                              value={departureDate}
                            />
                          </div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="bg-white justify-start items-start inline-flex">
                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                              Return Date
                            </div>
                          </div>
                          <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                            <DatePicker
                              disabledDate={(d) => {
                                return (
                                  d.isBefore(departureDate) ||
                                  d.isAfter(dayjs().add(2, "month"))
                                );
                              }}
                              onChange={onReturnDatePick}
                              style={{ width: "100%" }}
                              className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                              bordered={false}
                              format={customFormat}
                              value={returnDate}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!fromAirport || !toAirport}
                    type="submit"
                    className="my-4 justify-center rounded-2xl flex-col bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
                  >
                    <p className="self-stretch text-center text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-normal p-2">
                      Search Flights
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-32" />
          <HomeInfo1 />
        </main>

        <footer style={{ padding: 0 }}>
          <HomeFooter />
        </footer>

        {/* Alternative Dates Modal */}
        <Modal
          className="font-['Plus Jakarta Sans']"
          open={isModalOpen}
          title={
            <div style={{ textAlign: "center" }}>Alternative Departure Date</div>
          }
          closable={false}
          onCancel={() => setModalOpen(false)}
          footer={null}
          style={{ borderRadius: "16px", border: "1px solid white" }}
        >
          <div>
            <div className="justify-start w-full items-start gap-6">
              <div className="flex-col justify-start items-center gap-3 w-full">
                <div className="self-stretch h-[106px] flex-col justify-center items-center gap-2 flex">
                  <div className="justify-center items-center m-auto gap-5 inline-flex">
                    <div className="w-[100px] flex-col justify-start items-center inline-flex">
                      <div className="text-center text-neutral-900 text-4xl font-bold font-['Plus Jakarta Sans'] leading-[54px]">
                        {fromAirport?.abv ?? ""}
                      </div>
                      <div className="text-center text-gray-400 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        {fromAirport?.city ?? ""}
                      </div>
                    </div>
                    <div className="w-9 h-9 justify-center items-center flex">
                      <div className="w-9 h-9 relative">
                        <Image
                          src="/assets/arrow-right.svg"
                          alt="Arrow"
                          width={36}
                          height={36}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="w-[100px] flex-col justify-start items-center inline-flex">
                      <div className="text-center text-neutral-900 text-4xl font-bold font-['Plus Jakarta Sans'] leading-[54px]">
                        {toAirport?.abv ?? ""}
                      </div>
                      <div className="text-center text-gray-400 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        {toAirport?.city ?? ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow border border-gray-200 flex-col justify-start items-start flex">
                  {Array.from({ length: 7 }, (_, index) => {
                    const date = departureDate.add(index, 'day');
                    const prices = ['1,570K', '1,625K', 'N/A', '1,800K', '1,599K', '1,385K', 'N/A'];
                    const available = [true, true, false, true, true, true, false];
                    
                    return (
                      <div key={index}>
                        <a
                          onClick={() => available[index] && navigateToResults(index)}
                          className="self-stretch justify-start items-center inline-flex cursor-pointer"
                        >
                          <div className={`w-[88px] self-stretch px-4 py-2.5 ${index === 0 ? 'bg-primary' : 'bg-gray-100'} flex-col justify-center items-start gap-1 inline-flex`}>
                            <div className={`self-stretch ${index === 0 ? 'text-white' : 'text-gray-500'} text-xs font-normal font-['Plus Jakarta Sans'] leading-none`}>
                              Depart
                            </div>
                            <div className={`self-stretch ${index === 0 ? 'text-white' : 'text-neutral-900'} text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight`}>
                              {date.format("DD MMM")}
                            </div>
                          </div>
                          <div className={`grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 ${index === 0 ? 'bg-primary-background' : 'bg-white'} flex-col justify-center items-center gap-2 inline-flex`}>
                            <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                              <div className={`self-stretch ${index === 0 ? 'text-teal-700' : 'text-gray-500'} text-sm font-normal font-['Plus Jakarta Sans'] leading-tight`}>
                                {available[index] ? 'From' : 'No Flight'}
                              </div>
                              <div className={`self-stretch ${index === 0 ? 'text-teal-700' : 'text-neutral-900'} text-lg font-bold font-['Plus Jakarta Sans'] leading-7`}>
                                {available[index] ? `${prices[index]} IDR` : 'Not Available'}
                              </div>
                            </div>
                          </div>
                        </a>
                        {index < 6 && <div className="self-stretch h-[0px] border border-gray-100" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="self-stretch pt-8 flex-col justify-start items-start gap-6 flex">
              <div className="text-center text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                The presented fare is the lowest available for each date and
                covers the entire journey, selected fare category, pertains to a
                single adult traveler.
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}