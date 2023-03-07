

export const fromRules = {
  required: (message: string = "This field is required") => ({
    required: true,
    message,
  }),
};

