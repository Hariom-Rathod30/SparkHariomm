"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowDown,
  ArrowUp,
  Boxes,
  DollarSign,
  Info,
  PackageCheck,
  PackageOpen,
  PieChart as PieChartIcon,
  Recycle,
  LineChart as LineChartIcon,
  Truck,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell
} from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const demandForecastData = [
  { date: "Jan", demand: Math.floor(Math.random() * 1000) + 500 },
  { date: "Feb", demand: Math.floor(Math.random() * 1000) + 500 },
  { date: "Mar", demand: Math.floor(Math.random() * 1000) + 500 },
  { date: "Apr", demand: Math.floor(Math.random() * 1000) + 500 },
  { date: "May", demand: Math.floor(Math.random() * 1000) + 1500 },
  { date: "Jun", demand: Math.floor(Math.random() * 1000) + 500 },
]

const returnStatusData = [
  { name: "Resale", value: 400, color: "hsl(var(--chart-1))" },
  { name: "Donation", value: 300, color: "hsl(var(--chart-2))" },
  { name: "Liquidation", value: 300, color: "hsl(var(--destructive))" },
]

const stockRelocations = [
  { id: "TR-834", item: "Smart TV 55\"", from: "Store #2021", to: "Store #5301", status: "In Transit" },
  { id: "TR-835", item: "Gaming Laptops", from: "WH-04", to: "Store #2021", status: "Delivered" },
  { id: "TR-836", item: "Air Fryers", from: "Store #1080", to: "WH-02", status: "Pending" },
]

const chartConfig = {
  demand: {
    label: "Demand",
  },
}

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,523,189</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,231,890</div>
            <p className="text-xs text-muted-foreground">+18.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Returned</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockouts</CardTitle>
            <PackageOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-red-500 flex items-center"><ArrowUp className="h-3 w-3 mr-1"/> +12% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LineChartIcon className="h-5 w-5 text-accent"/>Demand Forecast</CardTitle>
            <CardDescription>Monthly demand forecast for key product categories.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandForecastData}>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="demand" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChartIcon className="h-5 w-5 text-accent"/>Return Status</CardTitle>
            <CardDescription>Disposition of returned items.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={returnStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {returnStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-accent"/>Recent Stock Relocations</CardTitle>
            <CardDescription>Dynamic stock movements based on demand.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockRelocations.map((relocation) => (
                  <TableRow key={relocation.id}>
                    <TableCell className="font-medium">{relocation.item}</TableCell>
                    <TableCell>{relocation.from}</TableCell>
                    <TableCell>{relocation.to}</TableCell>
                    <TableCell>
                      <Badge variant={
                        relocation.status === 'Delivered' ? 'default' :
                        relocation.status === 'In Transit' ? 'secondary' :
                        'outline'
                      } className={relocation.status === 'Delivered' ? 'bg-green-600/20 text-green-400 border-green-600/40' : ''}>{relocation.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-accent"/>Alerts</CardTitle>
            <CardDescription>Important notifications about your inventory.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <Alert>
                  <ArrowUp className="h-4 w-4 text-yellow-500" />
                  <AlertTitle>High Demand Alert</AlertTitle>
                  <AlertDescription>
                      Zip Code 90210 showing 150% spike in demand for "Organic Dog Food".
                  </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                  <ArrowDown className="h-4 w-4" />
                  <AlertTitle>Low Stock Warning</AlertTitle>
                  <AlertDescription>
                      "Smart TV 55\"" stock is below threshold at Store #1080.
                  </AlertDescription>
              </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
