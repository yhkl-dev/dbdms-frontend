const formRules = {
  resourceName: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur"
    },
    {
      min: 3,
      max: 5,
      message: "Length should be 3 to 5",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  password: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],

  description: [
    {
      required: true,
      message: "Please input activity form",
      trigger: "blur"
    }
  ]
};

const formData = {
  resourceName: ""
};
