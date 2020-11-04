const rules = {
  resourceName: [
    {
      required: true,
      message: "Please input resource name",
      trigger: "blur"
    },
    {
      min: 5,
      max: 20,
      message: "Length should be 5 to 20",
      trigger: "blur"
    }
  ],
  resourceUser: [
    {
      required: true,
      message: "Please input resource user name",
      trigger: "blur"
    }
  ],
  resourcePassword: [
    {
      required: true,
      message: "Please input resource user password",
      trigger: "blur"
    }
  ],
  resourceHostIP: [
    {
      required: true,
      message: "Please input resource IP address",
      trigger: "blur"
    }
  ],
  resourcePort: [
    {
      required: true,
      message: "Please input resource port",
      trigger: "blur"
    }
  ],
  resourceType: [
    {
      required: true,
      message: "Please select resource type",
      trigger: "change"
    }
  ],
  resourceDescription: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ]
};

export default rules;
