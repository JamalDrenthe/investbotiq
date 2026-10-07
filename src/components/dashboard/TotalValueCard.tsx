
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const TotalValueCard = () => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Totale Opbouw
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center">
        <CircleDollarSign className="h-5 w-5 text-muted-foreground mr-2" />
        <div className="text-2xl font-bold">
          —
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalValueCard;
