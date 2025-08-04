import { ROUTES } from "@/shared/model/routes";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/shared/ui/kit/card";
import type { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    form: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
    footerText: React.ReactNode;
};

const AuthLayout: FC<Props> = (props) => {
    const { form, title, description, footerText } = props;

    return (
        <main className="grow flex flex-col items-center pb-[200px] justify-center">
            <Card className="w-full max-w-[400px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardDescription>{description}</CardDescription>
                <CardContent>{form}</CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
                        {footerText}
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
};

export default AuthLayout;
