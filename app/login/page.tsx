import React, { useState, useCallback } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ValidateStatus } from "antd/lib/form/FormItem";
import Image from "next/image";
import { signIn } from "next-auth/react";
import TermsOfUseModal from "@/components/modals/TermsOfUseModal";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";

const { Text } = Typography;

// Asset paths as strings
const GoogleSvg = "/assets/google.svg";
const SignInImage = "/assets/sign-in.png";

const SignIn: React.FC = () => {
  const router = useRouter();

  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(true);

  const [email, setEmail] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: "" });

  const handleContinueWithGoogle = useCallback(async () => {
    try {
      await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  }, []);

  const handleContinueWithEmail = useCallback(() => {
    setIsOnboarding(false);
  }, []);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const validateEmail = useCallback((
    email: string
  ): { validateStatus: ValidateStatus; errorMsg: string | null } => {
    const res = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (res == null) {
      return {
        validateStatus: "error",
        errorMsg: "Please enter a valid email address",
      };
    }
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }, []);

  const onEmailChange = useCallback(async (value: string) => {
    const { validateStatus, errorMsg } = validateEmail(value);
    await setEmail({
      value,
      validateStatus,
      errorMsg,
    });
    if (validateStatus === "success") {
      setDisabledLogin(false);
    } else {
      setDisabledLogin(true);
    }
    console.log(value);
  }, [validateEmail]);

  const handleSignUp = useCallback(() => {
    router.push("/signup");
  }, [router]);

  const handleForget = useCallback(() => {
    router.push("/forgot-password");
  }, [router]);

  const handleTermsClick = useCallback(() => {
    setTermsVisible(true);
  }, []);

  const handlePrivacyClick = useCallback(() => {
    setPrivacyVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setTermsVisible(false);
    setPrivacyVisible(false);
  }, []);

  const handleSignIn = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    try {
      const result = await signIn('credentials', {
        email: email.value,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        showModal();
        return;
      }

      if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      showModal();
    }
  }, [email.value, password, router, showModal]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="md:h-screen md:w-screen-lg:w-1/2 sm:h-fit">
        <div className="hidden h-full rounded p-10 md:block">
          <Image
            src={SignInImage}
            alt="Sign In Image"
            width={800}
            height={600}
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>
      <div className="flex flex-grow items-center p-4 md:px-16 md:py-10">
        {isOnboarding ? (
          <div className="w-full self-center">
            <h1 className="mb-8 text-left text-4xl font-semibold">
              Welcome Back!
            </h1>
            <p className="mb-4 text-left text-lg">
              Ready to Fly? Sign in to access your account and manage your
              bookings.
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleContinueWithEmail}
                type="submit"
                className="mb-4 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-primary-dark"
              >
                <p className="p-2">Continue with Email</p>
              </button>

              <Button
                type="default"
                onClick={handleContinueWithGoogle}
                className="flex items-center justify-center border-1 border-solid border-neutral-light bg-white font-bold"
                size="large"
                block={true}
                icon={
                  <Image
                    src={GoogleSvg}
                    alt="Google Icon"
                    width={20}
                    height={20}
                    className="absolute bottom-1/4 left-4 top-1/4"
                  />
                }
              >
                Continue with Google
              </Button>
              <div className="h-4"></div>

              <div className="mb-8 text-center text-base font-normal text-[#677084]">
                Don&apos;t Have an Account?{" "}
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="mb-4 cursor-pointer font-medium text-primary hover:text-primary-dark"
                >
                  Sign Up
                </button>
              </div>

              <TermsOfUseModal open={termsVisible} onCancel={handleCancel} />
              <PrivacyPolicyModal
                open={privacyVisible}
                onCancel={handleCancel}
              />
              <Text className="mt-3 text-neutral">
                By continuing, you accept the{" "}
                <span
                  className="cursor-pointer font-semibold underline"
                  onClick={handleTermsClick}
                >
                  Terms Of Use
                </span>{" "}
                and{" "}
                <span
                  className="cursor-pointer font-semibold underline"
                  onClick={handlePrivacyClick}
                >
                  Privacy Policy
                </span>
                .
              </Text>
            </div>
          </div>
        ) : (
          <div className="w-full self-center">
            <h1 className="mb-2 text-left text-4xl font-semibold">
              Sign in to Your Account
            </h1>
            <p className="mb-8 text-left text-lg font-normal">
              Continue your journey with us.
            </p>

              <Form onFinish={handleSignIn}>
              <Form.Item
                validateStatus={email.validateStatus}
                help={email.errorMsg}
              >
                <Typography.Title
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                  level={5}
                >
                  Email
                </Typography.Title>
                <Input
                  style={{ marginTop: "0.5rem" }}
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                  }}
                  placeholder="Enter Your Email"
                />
              </Form.Item>
              <Form.Item>
                <Typography.Title
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                  level={5}
                >
                  Password
                </Typography.Title>
                <Input.Password
                  style={{ marginTop: "0.5rem" }}
                  placeholder="Enter Your Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForget}
                  className="mb-4 font-semibold text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mb-8 text-center text-base font-normal text-[#677084]">
                Don&apos;t Have an Account?{" "}
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="mb-4 cursor-pointer font-medium text-primary hover:text-primary-dark"
                >
                  Sign Up
                </button>
              </div>

              <Form.Item shouldUpdate>
                <div className="flex flex-col items-center">
                  <Button
                    htmlType="submit"
                    disabled={disabledLogin && password === ""}
                    className="mb-4 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-base font-bold text-white shadow-sm hover:bg-primary-dark disabled:bg-gray-400"
                    size="large"
                    block
                  >
                    Sign In
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <Modal
              open={isModalOpen}
              title="Account Not Found"
              closable={true}
              footer={[
                <button
                  key="cancel"
                  onClick={handleOk}
                  className="items-center justify-center border-neutral-light bg-white pr-6 font-bold"
                >
                  <p className="p-2">Use Another Email</p>
                </button>,
                <button
                  key="signup"
                  onClick={handleSignUp}
                  type="submit"
                  className="mb-4 justify-center rounded-md bg-primary px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-primary-dark disabled:bg-gray-400"
                >
                  <p className="p-2">Go to Sign Up</p>
                </button>,
              ]}
            >
              <p className="text-base font-normal font-['Plus Jakarta Sans'] leading-normal text-neutral-900">
                This SkyEskplorer account doesn&apos;t exist. Enter a different
                account or Sign Up to create a new one.
              </p>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;