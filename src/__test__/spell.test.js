const request = require("supertest");
const app = require("../app");
const connection = require("../server");

describe("Spell API endpoints", () => {
  beforeAll((done) => {
    connection.on("error", console.error);
    connection.once("open", () => done());
  });
  describe("@GET", () => {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3VsdUdhcnkiLCJlbWFpbCI6Imt1bHVsdS5nYXJ5QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTMwOTk3MjQzMDE3NDI2OTQ0MC9PU2R3Tm9zVV80MDB4NDAwLmpwZyIsInN1YiI6IjVlOTg3ZjhlNGI4ODM4MmE5OGM4NDA0MiIsInVzZXJJZCI6IjVlOTg3ZjhlNGI4ODM4MmE5OGM4NDA0MiIsImlhdCI6MTY1NTA1MDQxMX0.CKzIv4E9xHiq4oc68yrSZiAXnvdHOADtAUikqFBXKoc";

    it("should return an array of spells", () => {
      return request(app)
        .get("/api/v1/spells")
        .expect("Content-Type", /json/)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then((res) => console.log(res));
    });

    it("should return a spell by ID", () => {});

    it("should return a 401 error", () => {
      return request(app).get("/api/v1/spells").expect("Content-Type", /json/).expect(401);
    });

    it("should return a 400 error", () => {});
  });

  describe("@POST", () => {
    it("should create a new spell", () => {});

    it("should return a 401 error", () => {});

    it("should return a 403 error", () => {});

    it("should return a 400 error", () => {});
  });
});
