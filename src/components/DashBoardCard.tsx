import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DashBoardCardProps = {
    title: string;
    description: string;
    body: string
}

export function DashBoardCard({ title, description, body }: DashBoardCardProps) { 
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{body}</CardContent>
        </Card>
    )
}