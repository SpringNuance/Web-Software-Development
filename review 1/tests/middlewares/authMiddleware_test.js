import { authMiddleware } from "../../middlewares/authMiddleware.js"
import { assertEquals } from "../../deps.js";

Deno.test({
    name: "authMiddleware should not prevent unauthenticated access to URL starting with /api",
    fn: async () => {
        let allowedAccess = false
        const myNext = () => {
          allowedAccess = true
        }
        let myContext = {
          request: {
            url: {
              pathname: "/api/questions/random",
            }
          },
          state: {
            session: {
                get: () => { return false } // Unauthenticated
              },
          },

        }
        await authMiddleware(myContext, myNext);
        assertEquals(allowedAccess, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});


Deno.test({
    name: "authMiddleware should prevent unauthenticated access to URL starting with /questions",
    fn: async () => {
        let allowedAccess = false
        const myNext = () => {
          allowedAccess = true
        }
        let usedUrl = null;
        let myContext = {
          request: {
            url: {
              pathname: "/questions",
            }
          },
          response: {
            redirect: (parameterValue) => {
                usedUrl = parameterValue;
            },  
          },
          state: {
            session: {
                get: () => { return false } // Unauthenticated
              },
          },

        }
        await authMiddleware(myContext, myNext);
        assertEquals(allowedAccess, false);
        console.log(usedUrl);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "authMiddleware should prevent unauthenticated access to URL starting with /statistics",
    fn: async () => {
        let allowedAccess = false
        const myNext = () => {
          allowedAccess = true
        }
        let usedUrl = null;
        let myContext = {
          request: {
            url: {
              pathname: "/statistics",
            }
          },
          response: {
            redirect: (parameterValue) => {
                usedUrl = parameterValue;
            },  
          },
          state: {
            session: {
                get: () => { return false } // Unauthenticated
              },
          },

        }
        await authMiddleware(myContext, myNext);
        assertEquals(allowedAccess, false);
        console.log(usedUrl);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "authMiddleware should prevent unauthenticated access to URL starting with /quiz",
    fn: async () => {
        let allowedAccess = false
        const myNext = () => {
          allowedAccess = true
        }
        let usedUrl = null;
        let myContext = {
          request: {
            url: {
              pathname: "/quiz",
            }
          },
          response: {
            redirect: (parameterValue) => {
                usedUrl = parameterValue;
            },  
          },
          state: {
            session: {
                get: () => { return false } // Unauthenticated
              },
          },

        }
        await authMiddleware(myContext, myNext);
        assertEquals(allowedAccess, false);
        console.log(usedUrl);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});





