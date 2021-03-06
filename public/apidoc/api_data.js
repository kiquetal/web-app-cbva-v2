define({ "api": [
  {
    "type": "get",
    "url": "/firefighters",
    "title": "All Firefighters list",
    "group": "Firefighters",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "q",
            "description": "<p>Name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Firefighter id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ba",
            "description": "<p>Bombero Asuncion number</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "swore_date",
            "description": "<p>Date of swore</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "person_id",
            "description": "<p>Id from table Person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "update_date",
            "description": "<p>Update Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rank_id",
            "description": "<p>Id from rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>Status firefighter</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 513,\n  \"ba\": 1,\n  \"swore_date\": null,\n  \"person_id\": 1,\n  \"update_date\": null,\n  \"rank_id\": 2,\n  \"active\": 1\n\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/firefighters.js",
    "groupTitle": "Firefighters",
    "name": "GetFirefighters"
  },
  {
    "type": "get",
    "url": "/firefighters/:ba",
    "title": "Details from Firefighter",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ba",
            "description": "<p>Firefighter unique ID.</p>"
          }
        ]
      }
    },
    "group": "Firefighters",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Firefighter id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name from table Person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rango",
            "description": "<p>Acronim from table Rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Current Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "    HTTP/1.1 200 OK\n    {\n\"id\": 513,\n\"name\": \"Tomas Florentin\",\n\"rango\": \"RESERVA\",\n\"status\": 1\n\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/firefighters.js",
    "groupTitle": "Firefighters",
    "name": "GetFirefightersBa"
  },
  {
    "type": "get",
    "url": "/persons",
    "title": "All persons",
    "group": "Persons",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Person id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Person's name</p>"
          },
          {
            "group": "Success 200",
            "type": "cin",
            "optional": false,
            "field": "cin",
            "description": "<p>Identification NUmber</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n {\n    \"id\": 1,\n    \"name\": \"Pedro Jaime Logan Keene\",\n    \"cin\": \"\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/persons.js",
    "groupTitle": "Persons",
    "name": "GetPersons"
  },
  {
    "type": "get",
    "url": "/persons/:id",
    "title": "Details from Person",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique person id.</p>"
          }
        ]
      }
    },
    "group": "Persons",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Person id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Person's name</p>"
          },
          {
            "group": "Success 200",
            "type": "cin",
            "optional": false,
            "field": "cin",
            "description": "<p>Identification NUmber</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n        \"id\": 3,\n        \"name\": \"Amado Adolfo Sanabria Flecha\",\n        \"cin\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/persons.js",
    "groupTitle": "Persons",
    "name": "GetPersonsId"
  },
  {
    "type": "get",
    "url": "/persons/:person_id/attendances",
    "title": "Attendances by PersonId",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "person_id",
            "description": "<p>Person unique ID.</p>"
          }
        ]
      }
    },
    "group": "Persons",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Name",
            "optional": false,
            "field": "name",
            "description": "<p>person name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "attendances",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "attendances.activity_id",
            "description": "<p>Person id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "attendances.present",
            "description": "<p>Person\\s name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "attendances.is_instructor",
            "description": "<p>If person is instructor in this activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "attendances.description",
            "description": "<p>Description of activity,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "attendances.start_date",
            "description": "<p>Start date of activity.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "attendances.end_date",
            "description": "<p>End date of activity for this person</p>"
          },
          {
            "group": "Success 200",
            "type": "ba",
            "optional": false,
            "field": "ba",
            "description": "<p>If this person is a firefighter should have a ba identification.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "    HTTP/1.1 200 OK\n     {\n    \"name\": \"SENAD INSTRUCTOR 1\",\n    \"attendances\": [\n        {\n            \"activity_id\": 1,\n            \"present\": 0,\n            \"is_instructor\": 1,\n            \"description\": \"probando put\",\n            \"start_date\": \"2018-07-22T21:12:32\",\n            \"end_date\": \"2018-07-22T21:38:21\"\n        },\n        {\n            \"activity_id\": 2,\n            \"present\": 0,\n            \"is_instructor\": 0,\n            \"description\": \"Actualizando actividad\",\n            \"start_date\": \"Invalid date\",\n            \"end_date\": \"Invalid date\"\n        }\n    ],\n    \"ba\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/persons.js",
    "groupTitle": "Persons",
    "name": "GetPersonsPerson_idAttendances"
  },
  {
    "type": "put",
    "url": "/persons/:id",
    "title": "Update details from Person",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique person id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"John Connor\",\n  \"cin\":\"2321312\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Persons",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Person id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Person's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cin",
            "description": "<p>Identification NUmber</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": 3,\n \"name\": \"Amado Adolfo Sanabria Flecha\",\n \"cin\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/persons.js",
    "groupTitle": "Persons",
    "name": "PutPersonsId"
  },
  {
    "type": "get",
    "url": "/ranks",
    "title": "All ranks",
    "group": "Ranks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rank id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acronim",
            "description": "<p>Acronimd</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description for Rank</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"acronim\": \"BVC\",\n    \"description\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ranks.js",
    "groupTitle": "Ranks",
    "name": "GetRanks"
  },
  {
    "type": "get",
    "url": "/ranks/:rank_id",
    "title": "Get specific rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rank_id",
            "description": "<p>Identification's rank</p>"
          }
        ]
      }
    },
    "group": "Ranks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rank id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acronim",
            "description": "<p>Acronimd</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description for Rank</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"acronim\": \"BVC\",\n    \"description\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ranks.js",
    "groupTitle": "Ranks",
    "name": "GetRanksRank_id"
  },
  {
    "type": "put",
    "url": "/ranks/:rank_id",
    "title": "Update rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rank_id",
            "description": "<p>Identification's rank</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "acronim",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"acronim\": \"Combate\",\n  \"description\":\"Rango basico\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Ranks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Rank id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acronim",
            "description": "<p>Acronimd</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description for Rank</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"acronim\": \"BVC\",\n    \"description\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/ranks.js",
    "groupTitle": "Ranks",
    "name": "PutRanksRank_id"
  }
] });
