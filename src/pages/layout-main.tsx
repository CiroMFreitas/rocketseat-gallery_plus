import { Outlet } from "react-router";
import MainHeader from "../components/main-header";
import MainContent from "../components/main-content";
import Container from "../components/container";

export default function LayoutMain() {
    return (
        <Container>
            <MainHeader className="mt-9" />
            <MainContent>
                <Outlet />
            </MainContent>
        </Container>
    );
}