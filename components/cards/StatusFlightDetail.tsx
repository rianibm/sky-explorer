import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";

// SVG paths as strings
const Circle = "/assets/circle-border.svg";
const AirplaneVerticalRotated = "/assets/airplane-rotated-vertical.svg";

interface StatusFlightDetailProps {
  open: boolean;
  onCancel: () => void;
  status: "Departed" | "Arrived";
}

export default function StatusFlightDetail({
  open,
  onCancel,
  status,
}: StatusFlightDetailProps) {
  const title = (
    <div className="flex items-center">
      <CloseOutlined
        className="cursor-pointer text-lg transition-colors hover:text-gray-600"
        onClick={onCancel}
      />
      <div className="flex-1 text-center text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
        {status === "Departed" ? "Departure Detail" : "Arrival Detail"}
      </div>
    </div>
  );

  const statusConfig = {
    Arrived: {
      bgColor: "bg-success-background",
      textColor: "text-success-dark",
      iconColor: "#247535",
    },
    Departed: {
      bgColor: "bg-warning-lightest",
      textColor: "text-warning-dark",
      iconColor: "#AC5200",
    },
  };

  const config = statusConfig[status];

  return (
    <Modal
      title={title}
      className="text-center"
      closable={false}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <hr className="mt-5 w-full border-gray-200" />
      <div className="my-8 flex flex-col gap-6 px-8 text-left">
        {/* Status Badge */}
        <div
          className={`flex items-center justify-center gap-2 rounded-xl p-3 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 ${config.bgColor} ${config.textColor}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-6 w-6"
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
              fill={config.iconColor}
            />
          </svg>
          {status}
        </div>

        {/* Route */}
        <p className="text-lg font-medium font-['Plus Jakarta Sans']">
          Jakarta (CGK) to Singapore (SIN)
        </p>

        {/* Travel Time */}
        <div className="flex items-center gap-3">
          <p className="font-medium font-['Plus Jakarta Sans']">Total Travel Time</p>
          <div className="rounded-lg bg-primary-background px-3 py-2 text-sm font-medium font-['Plus Jakarta Sans'] text-primary">
            1h 55m
          </div>
        </div>

        {/* Flight Timeline */}
        <div className="flex gap-6">
          {/* Time Column */}
          <div className="flex flex-col justify-between">
            {/* Departure Time */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-semibold font-['Plus Jakarta Sans'] text-primary">
                Actual
              </p>
              <p className="text-xl font-bold font-['Plus Jakarta Sans']">
                10.30
              </p>
              <p className="text-sm font-medium font-['Plus Jakarta Sans'] text-gray-600">
                Jan 16
              </p>
            </div>

            {/* Arrival Time */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-semibold font-['Plus Jakarta Sans'] text-primary">
                Actual
              </p>
              <p className="text-xl font-bold font-['Plus Jakarta Sans']">
                13.20
              </p>
              <p className="text-sm font-medium font-['Plus Jakarta Sans'] text-gray-600">
                Jan 16
              </p>
            </div>
          </div>

          {/* Flight Path Visual */}
          <div className="flex flex-col items-center justify-center gap-2 px-4">
            <Image 
              src={Circle} 
              alt="Origin point" 
              width={24} 
              height={24}
            />
            <div className="h-48 border-l-2 border-dashed border-primary" />
            <Image 
              src={AirplaneVerticalRotated} 
              alt="Airplane" 
              width={24} 
              height={24}
            />
          </div>

          {/* Airport Details Column */}
          <div className="flex flex-1 flex-col justify-between">
            {/* Departure Airport */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold font-['Plus Jakarta Sans']">
                Jakarta (CGK), Indonesia
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] text-gray-700">
                Soekarno Hatta International
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] text-gray-500">
                Terminal 4
              </p>
            </div>

            {/* Arrival Airport */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold font-['Plus Jakarta Sans']">
                Singapore (SIN), Singapore
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] text-gray-700">
                Changi International Airport
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] text-gray-500">
                Terminal 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}