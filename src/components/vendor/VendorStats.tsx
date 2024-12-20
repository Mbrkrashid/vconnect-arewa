import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VendorStatsProps {
  stats: {
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    totalProducts: number;
    viewsLastMonth: number;
    engagementRate: string;
  };
  joinedDate: string;
}

export const VendorStats = ({ stats, joinedDate }: VendorStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Sales</span>
              <span className="font-medium">{stats.totalSales}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue</span>
              <span className="font-medium">${stats.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium">⭐ {stats.averageRating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Products</span>
              <span className="font-medium">{stats.totalProducts}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Views</span>
              <span className="font-medium">{stats.viewsLastMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Engagement Rate</span>
              <span className="font-medium">{stats.engagementRate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};