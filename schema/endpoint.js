const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();
const inUrl = "Please input URL!";
const inQuery = "Please input Query!";

const options = {
  customSiteTitle: config.options.webName,
  customfavIcon: config.options.favicon,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
  ],
  customCssUrl: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
  ],
  customCss: `${theme.getBuffer(SwaggerThemeNameEnum.LIGHT)}.topbar { display: none; }`,
  swaggerOptions: {
    displayRequestDuration: true,
  },
};

const swaggerDocument = {
  swagger: "2.0",
    host: config.host.BASE_URL,
      basePath: "/",
  tags: [
    {
      name: "AI",
      description:
        "API endpoints for artificial intelligence content from various platforms.",
    },
       {
         name: "Search",
         description:
          "API endpoints for Search anything from various platforms.",
       },
    {
       name: "Downloader",
       description:
         "API endpoints for downloading content from various platforms.",
     },
    // {
    //   name: "Tools",
    //   description: "API endpoints for content tools from multiple platforms.",
    // },
  ],
  paths: {
    "/api/ai/nvidia": {
      get: {
        tags: ["AI"],
        summary: "NvdiaAi Use Nemotron Engine ",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I help you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
   "/api/ai/tiktoks": {
      get: {
        tags: ["Search"],
        summary: "Looking for Tik-Tok Videos",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I help you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }, 
   "/api/ai/lyrics": {
      get: {
        tags: ["Search"],
        summary: "You can search for song lyrics",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I help you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/ai/gptlogic": {
      get: {
        tags: ["AI"],
        summary: "Chat with GPT Logic",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
          {
            in: "query",
            name: "prompt",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example:
                            "Hello! How can I help you with your prompt?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/ai/gemini": {
      get: {
        tags: ["AI"],
        summary: "Realtime Gemini AI",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I help you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  "/api/ai/blackbox": {
      get: {
        tags: ["AI"],
        summary: "BlackBox Ai Chat",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: inQuery,
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I help you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  "/api/ai/alicia": {
    "get": {
      "tags": ["AI"],
      "summary": "Alicia Ai",
      "parameters": [
        {
          "in": "query",
          "name": "query",
          "schema": {
            "type": "string"
          },
          "required": true,
          "description": "Query parameter"
        }
      ],
      "responses": {
        "200": {
          "description": "Result successfully returned",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "boolean",
                    "example": true
                  },
                  "developer": {
                    "type": "string",
                    "example": "developerName"  // Replace with actual developer name or value
                  },
                  "result": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Hello! How can I help you today?"
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "x-request-time": new Date().toISOString(),
};

module.exports = { swaggerDocument, options };
