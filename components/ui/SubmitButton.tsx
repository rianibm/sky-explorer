import { Button, Form, FormInstance } from "antd";
import { useEffect, useState, useCallback } from "react";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);
  
  // Watch all values
  const values = Form.useWatch([], form);

  // Memoize validation function to prevent unnecessary re-renders
  const validateForm = useCallback(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form]);

  useEffect(() => {
    validateForm();
  }, [values, validateForm]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      className="mb-2 mt-5 bg-primary"
      size="large"
      block={true}
      disabled={!submittable}
    >
      Next
    </Button>
  );
};

export default SubmitButton;