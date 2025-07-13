import { Modal } from "antd";

export default function PrivacyPolicyModal({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) {
  return (
    <Modal
      title="Privacy Policy"
      className="text-center font-semibold"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <hr className="mt-5 w-full border-gray-200" />
      <div className="my-8 flex flex-col gap-6 px-8 text-left">
        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">1. Introduction</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            SkyEksplorer Airlines Services Ltd. (&ldquo;SkyEksplorer,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) is committed to protecting the privacy of our users. This
            Privacy Policy outlines how we collect, use, disclose, and protect
            your personal information when you use our flight booking services
            via mobile or website.
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">2. Information We Collect</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            We collect various types of information to provide and improve our services:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc space-y-2 text-gray-700">
              <li>
                <strong>User Account Information:</strong> When you create an account, we collect
                your name, email address, and other relevant information.
              </li>
              <li>
                <strong>Booking and Payment Information:</strong> To facilitate flight bookings,
                we collect information related to your bookings and payment
                details.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect data on your interactions with our
                services, including pages visited, searches, and preferences.
              </li>
              <li>
                <strong>Device Information:</strong> We collect information about the device you
                use to access our services, such as the device type, operating
                system, and browser.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">3. How We Use Your Information</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            We use the collected information for the following purposes:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc space-y-2 text-gray-700">
              <li>To provide and personalize our flight booking services.</li>
              <li>To process transactions and bookings.</li>
              <li>To improve our services and enhance user experience.</li>
              <li>To communicate with you about your bookings and updates.</li>
              <li>To analyze usage patterns and optimize our platform.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">4. Data Sharing and Disclosure</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            We may share your information with:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc space-y-2 text-gray-700">
              <li>Airlines and service providers to fulfill bookings.</li>
              <li>Payment processors for secure transactions.</li>
              <li>Third-party service providers who assist us in operating our platform.</li>
              <li>Legal authorities when required by law or to protect our rights.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">5. Security Measures</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            We implement reasonable security measures to protect your
            information from unauthorized access or disclosure. However, no method
            of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">6. Your Rights</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            You have the right to:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc space-y-2 text-gray-700">
              <li>Access and review your personal information.</li>
              <li>Request corrections to inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col font-semibold">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">7. Contact Us</h3>
          <div className="pl-4 font-normal leading-relaxed text-gray-700">
            If you have any questions about this Privacy Policy or our data practices,
            please contact us at privacy@skyeksplorer.com or through our customer
            service channels.
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 2025
          </p>
          <p className="mt-2 text-sm text-gray-600">
            This Privacy Policy may be updated from time to time. We will notify you
            of any significant changes by posting the new Privacy Policy on our website.
          </p>
        </div>
      </div>
    </Modal>
  );
}