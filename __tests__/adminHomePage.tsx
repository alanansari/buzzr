// import Home from "@/app/admin/page"
// import { render } from "@testing-library/react"
// import { prismaMock } from "@/utils/singleton"
// import { prisma } from "@/utils/prisma"
// import Buzzrs from "@/components/Admin/Home/Buzzrs";
// import { getServerSession } from "next-auth";

// jest.mock("next/router", () => ({
//     useRouter: jest.fn(),
// }));

// // Mocking getServerSession from next-auth
// jest.mock("next-auth", () => ({
//     getServerSession: jest.fn(),
// }));

// // Mocking prisma
// jest.mock("@/utils/prisma", () => ({
//     prisma: {
//         user: {
//             findUnique: jest.fn(),
//         },
//         quiz: {
//             findMany: jest.fn(),
//         },
//     },
// }));

// describe("Admin Home page - rendering", () => {

//     it("fetch all the buzzrs of a user", () => {
//         const mockSession = { user: { email: "test@example.com" } };
//         const mockUser = { id: "1" };
//         const mockQuizzes = [
//           { id: "1", title: "Quiz 1", description: "Description 1" },
//           { id: "2", title: "Quiz 2", description: "Description 2" },
//         ];

//         // Mocking session and user
//         getServerSession.mockResolvedValueOnce(mockSession);
//         prisma.user.findUnique.mockResolvedValueOnce(mockUser);
//         prisma.quiz.findMany.mockResolvedValueOnce(mockQuizzes);

//         render(<Buzzrs />);

//     })

//     it("renders all the buzzers and heading", () => {
//         render(<Home />)

//     })

//     it("redirect on clicking quiz", () => {
//         render(<Home />)

//     })

//     it("renders No Quizzes yet text", () => {
//         render(<Home />)

//     })

//     // it("renders create buzzr model on click 'Create Buzzr' button", ()=>{
//     //     render (<Home />)

//     // })
// })

// // test for prisma
// // test for length of array - 'see all' one
// // button click pr model
// // button to submit
