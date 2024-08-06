import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex justify-between flex-row items-center">
                <Image alt="FSW Barber" src="/Logo.png" height={18} width={120}/>
                <Button size="icon" variant="outline">
                    <MenuIcon/>
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;