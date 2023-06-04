import { assign, createMachine } from "xstate";

const formInputMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgSQHYAcBXAFwDoBDAY2IEsA3MAYgBFsBlAQQCEAZAUWYBtAAwBdRKHypYNWqlwSQAD0QBOAMyrSqgGwAOAOx7hAVgCMBk0bMAaEAE9EAFgBMO0qZfCD6szuHGPgYAvsF2aFh4RGRUtAykaJSEsAmoSbCQjLwAqgBKIuJIIFIycgpFKgguZlp6TuqWdo5VBsLaqh11Bk5m1cKqTqHhGDgEJBTU9GCp6aSEuInJmQBiAPIAwtlsBYolsjTyipXVtfWNDoguXqROHapdPX0DQyARo9ETcdN05AA2NBByGVGOsABIcAByAHE+DsinsykdEGZhC4ms4dCZSC5bvcnN1eijnmFXiMouNYlNSD9-oCyqR8GBcBAaLgoIwIPJpqy6KgANbTN7kmKTeI0gFAg64BlMllshA8tKS+QFOGSaT7Q4VRDmLStXwmQ0WKx6WwXBD1MztTr4x5EwYkoVjEVfal-CX0xnM1ns3J8AAKq1yABUAPrYCEANQ4PGwQjEuw1iO1CF1pH1ZkN5ks1nRFoMWlxeIJTwdw0iztILNg5AARr8mHwIdx+GrikmpUiEBotLpDMZsyazc0ceptMIUepMcYnMIpzpQiTcKgIHBFE7oonSp2UwBaVx5-cuF4bimisBbzXlUCVHR5pxYkwnsmVynxRbweEdrU3nVOPNmOoLjWsWdr9GWpIVh8b6CmkyQzEsECXsmv4ICiaLmlc7gmHo6i+IED5OK4T6Oi+0HnghKTzB+kDITuqF4VimY6C4Jh5lcWgBHhZgESYRGsc+UFnq64p0vR7bbj+yh-nm6j1DcdwPIS4GCe8wlUqJyrSl6cpQHRUmVL4bROPo5zNCZTjaAYmL4jiynEuWakuhp7pifIpA8q5+nXtJCAGD444sQOxq5uaJioumbh8QYdmlqpwqfC5tJaW6tLeV2-ljqowhBaYIWmve6htHcoH2RBp5kNWdYNulKYotZ6Y8UYeU5gVmEmMBTh1FOHSAUEi7BEAA */
    id: "formInput",

    states: {
      active: {
        states: {
          focus: {
            states: {
              focused: {
                on: {
                  BLUR: "unfocused",
                },
              },
              unfocused: {
                on: {
                  FOCUS: "focused",
                },
              },
            },

            initial: "focused",
          },

          validation: {
            states: {
              pending: {
                on: {
                  REPORT_INVALID: {
                    target: "invalid",
                    actions: "assignReasonToErrorMessage",
                  },
                },

                invoke: {
                  src: "validateField",
                  onDone: "valid",
                },
              },

              invalid: {},
              valid: {},
            },

            initial: "pending",

            on: {
              CHANGE: {
                target: ".pending",
                actions: "assignValueToContext",
              },
            },
          },
        },

        initial: "focus",

        on: {
          DISABLED: "disable",
        },
      },
      disable: {
        on: {
          ENABLE: "active",
        },
      },
    },

    initial: "active",
  },
  {
    actions: {
      assignReasonToErrorMessage: assign((context, event) => {
        if (event.type !== "REPORT_INVALID") return {};
        return {
          errorMessage: event.reason,
        };
      }),
      assignValueToContext: assign((context, event) => {
        if (event.type !== "CHANGE") return {};
        return {
          value: event.value,
        };
      }),
    },
    services: {
      validateField: context => send => {
        if (context.value === "") {
          send({
            type: "REPORT_INVALID",
            reason: "Value cannot be empty",
          });
        }
      },
    },
  },
);
