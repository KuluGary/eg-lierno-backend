const app = require("../app");
const request = require("supertest");
require("./server");
describe("Testing user functionality", () => {
    describe("POST /v1/auth/login", () => {
        let creds = {
            username: "KuluGary",
            password: "gary1996",
        };
        it("should return 200 and login user", async () => {
            const res = await request(app)
                .post("/api/v1/auth/login")
                .send(creds);
            console.log(res);
            expect(res.status).toBe(200);
        });
    });
});
//# sourceMappingURL=user.spec.js.map