import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UnprotectedRoute from "./UnprotectedRoute.jsx";
import Error from "../pages/Error.jsx"; 
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
        componentImport()
            .then((component) => {
                resolve(component);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            });
    });
};

const Loading = (
    <div
        style={{
            position:'fixed',
            left:0  ,
            top:0,
            zIndex:999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "var(--primaryColor)",
        }}
    >
        <CircularProgress size={'1.1rem'} color="inherit" />
    </div>
);

// Teacher pages
const TeacherHome = lazy(() =>
    lazyRetry(() => import("../pages/teacher/TeacherHome.jsx"))
)
const AddGrades = lazy(() =>
    lazyRetry(() => import("../pages/teacher/AddGrades.jsx"))
)
const AddMaterial = lazy(() =>
    lazyRetry(() => import("../pages/teacher/AddMaterial.jsx"))
)
const Students = lazy(() =>
    lazyRetry(() => import("../pages/teacher/Students.jsx"))
)
const Messages = lazy(() =>
    lazyRetry(() => import("../pages/teacher/Messages.jsx"))
)
const SendMessage = lazy(() =>
    lazyRetry(() => import("../pages/teacher/SendMessage.jsx"))
)
const Requests = lazy(() =>
    lazyRetry(() => import("../pages/teacher/Requests.jsx"))
)
const AddQuestion = lazy(() =>
    lazyRetry(() => import("../pages/teacher/AddQuestions.jsx"))
)
// Student pages
const StudentHome = lazy(() =>
    lazyRetry(() => import("../pages/student/StudentHome.jsx"))
)
const CreateTest = lazy(() =>
    lazyRetry(() => import("../pages/student/CreateTest.jsx"))
)
const ExamDates = lazy(() =>
    lazyRetry(() => import("../pages/student/ExamDates.jsx"))
)
const Grades = lazy(() =>
    lazyRetry(() => import("../pages/student/Grades.jsx"))
)
const Schedule = lazy(() =>
    lazyRetry(() => import("../pages/student/Schedule.jsx"))
)
const SendMessageStudent = lazy(() =>
    lazyRetry(() => import("../pages/student/SendMessage.jsx"))
)

// Auth pages
const SignIn = lazy(() =>
    lazyRetry(() => import("../pages/auth/SignIn.jsx"))
)

const teacher = localStorage.getItem('isTeacher')
const isTeacher = JSON.parse(teacher)
const router = createBrowserRouter([
    {
        path: "auth",
        errorElement:Loading,
        element: <AuthLayout/>,
        children: [
            {   index: true,
                element: (
                <UnprotectedRoute>
                    <Suspense fallback={Loading}>
                        <SignIn />
                    </Suspense>
                </UnprotectedRoute>
                )
            }
        ]
    },
    {
        path: "",
        errorElement: Loading,
        element: <MainLayout/>,
        children: isTeacher === true ? [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <TeacherHome />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: "add-grades",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <AddGrades />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "add-material",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <AddMaterial />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "messages",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Messages />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "send-message",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <SendMessage />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "students",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Students />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "requests",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Requests />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "add-question",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <AddQuestion />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path:"*",
                element: (
                    <Suspense fallback={Loading}>
                        <Error />
                    </Suspense>
                )
            }
        ] 
        : 
        [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <StudentHome /> 
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: "exam-dates",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <ExamDates />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "grades",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Grades />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "schedule",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Schedule />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "create-test",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <CreateTest />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "messages",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <Messages />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path: "send-message",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={Loading}>
                            <SendMessageStudent />
                        </Suspense>
                     </ProtectedRoute>
                )
            },
            {
                path:"*",
                element: (
                    <Suspense fallback={Loading}>
                        <Error />
                    </Suspense>
                )
            }
        ]
    },
    
])

export default router