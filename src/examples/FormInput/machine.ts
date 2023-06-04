import { createMachine } from "xstate";

const formInputMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgSQHYAcBXAFwDoBDAY2IEsA3MAYgFEBBAIQBlmBtABgC6iUPlSwatVLmEgAHogCsANgCcpBQBoQAT0QBmJX1IAWAIxKLlqwHYAvra1oseImQg1Y5AEYAbJgBFsAGUObn9+ISQQUXFJaSj5BGU1TR1EACZTIwUADj18gsK9Y3tHDBwCEgpqejBSNEpCWHrURthIRi4AVQAlCJkYiRopGUTMtRzjPWtU3QR0pRzSkCcK12raBha20kJcBqaOgDEAeQBhLqD+qMG40YzTCamZrTnM63Vl1Zcqqk26ujkHw0CDkOKkfBgXDuXBQRg9ZgABROPQAKgB9bAAOQAaqxONhwoIBmIhiMEg8FKR0ipFi80ghjOk7MtcKgIHAZN9KsQSbFhvFQIkALRM16IUXpL7lH5kP61PlkwVyRBKcWM4yfBwrGU80juTy+MCKu4UhDWPhKamzB5qcxWB0WFTS5x6+VbA7wG6k01CxTGdWmPSmF1rX41D2tJrbQ4QE0C+4ILLpdXpdJ6dR5IpFEPa7nrd11T27fZR9px7388l+hD5KmmZTpG3zBakPhZ7MFXNlV0FiMAoEgsEJytKxMKAMM4rZUOyja1UiA4Gg8GQ6E0WHx6sqpN8FMMpkfBSzt39xeDlcC0gbpcgrfKxLGPgZ57Nw9a+xAA */
  id: "formInput",

  on: {
    "Event 1": {
      target: "#formInput",
      internal: true
    }
  },

  states: {
    active: {
      on: {
        EABLE: "disable"
      },

      states: {
        focus: {
          states: {
            focused: {
              on: {
                BLUR: "unfocused"
              }
            },
            unfocused: {
              on: {
                FOCUS: "focused"
              }
            }
          },

          initial: "focused"
        },

        validation: {
          states: {
            pending: {
              on: {
                REPORT_INVALID: "invalid"
              },
            },
            invalid: {}
          },

          initial: "pending"
        }
      },

      initial: "focus"
    },
    disable: {
      on: {
        DISABLED: "active"
      }
    }
  },

  initial: "active"
});
