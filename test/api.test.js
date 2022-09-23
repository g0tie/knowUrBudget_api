const request = require("supertest")
const baseURL = "http://localhost:8000/api";

describe("POST /signin", () => {
   
    it("should return 404", async () => {
        const credentials = {
            email: "test1sdfsd3@mail.com",
            password: "test123",
        }
       
        const response = await request(baseURL + "/auth")
            .post("/signin")
            .send(credentials);


      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should return 200", async () => {
        const credentials = {
            email: "example@mail.com",
            password: "example",
        }
       
        const response = await request(baseURL + "/auth")
            .post("/signin")
            .send(credentials);


      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(credentials.email)
    });


   
  });

describe("POST /signout", () => {
   let cookie;

    beforeAll(async () => {
         const credentials = {
            email: "example@mail.com",
            password: "example",
        }
       
        const response = await request(baseURL + "/auth")
            .post("/signin")
            .send(credentials)
            
        const cookies = response.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
        cookie = cookies.join(';');
    });


  

    it("should return 200", async () => {
     
        const response = await request(baseURL + "/auth")
            .post("/signout")
            .set('Cookie',[`token=${cookie}`])


      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Logged out")
    });


   
  });

