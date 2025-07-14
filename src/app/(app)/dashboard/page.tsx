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
  Info,
  LineChart as LineChartIcon,
  PackageOpen,
  PieChart as PieChartIcon,
  Recycle,
  Truck,
} from "lucide-react"
import {
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
  { id: "TR-834", item: "Smart TV 43\"", from: "Store #2021 (Mumbai)", to: "Store #5301 (Pune)", status: "In Transit" },
  { id: "TR-835", item: "Gaming Laptops", from: "WH-Delhi", to: "Store #2021 (Mumbai)", status: "Delivered" },
  { id: "TR-836", item: "Air Fryers", from: "Store #1080 (Bangalore)", to: "WH-Chennai", status: "Pending" },
]

const chartConfig = {
  demand: {
    label: "Demand",
  },
}

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Unified Inventory Command Center</h1>
        <p className="text-muted-foreground mt-1">
         A real-time, AI-driven overview of your entire retail ecosystem, from national supply chains to hyperlocal store shelves.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unified Inventory (Units)</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,45,23,189</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real-time Asset Valuation</CardTitle>
             <p className="text-sm text-muted-foreground">(₹)</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹92,31,890</div>
            <p className="text-xs text-muted-foreground">+18.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seamless Returns Management</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proactive Stockout Prevention</CardTitle>
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
            <CardTitle className="flex items-center gap-2"><LineChartIcon className="h-5 w-5 text-accent"/>Predictive Demand Intelligence</CardTitle>
            <CardDescription>Anticipate market shifts with hyper-local demand forecasting, ensuring the right product is always at the right place.</CardDescription>
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
            <CardTitle className="flex items-center gap-2"><PieChartIcon className="h-5 w-5 text-accent"/>Optimized Reverse Logistics</CardTitle>
            <CardDescription>Transform returns into revenue with intelligent disposition, maximizing value from every item.</CardDescription>
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
            <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-accent"/>Intelligent Stock Balancing</CardTitle>
            <CardDescription>Automate stock relocations based on predictive analytics, preventing stockouts and reducing overstock.</CardDescription>
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
            <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-accent"/>Actionable Insights Engine</CardTitle>
            <CardDescription>Receive real-time alerts for critical inventory events, enabling immediate, data-driven action.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <Alert>
                  <ArrowUp className="h-4 w-4 text-yellow-500" />
                  <AlertTitle>High Demand Alert</AlertTitle>
                  <AlertDescription>
                      Pincode 400050 (Juhu, Mumbai) showing 150% spike in demand for "Premium Cricket Bats".
                  </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                  <ArrowDown className="h-4 w-4" />
                  <AlertTitle>Low Stock Warning</AlertTitle>
                  <AlertDescription>
                      "Smart TV 43\"" stock is below threshold at Store #1080 (Bangalore).
                  </AlertDescription>
              </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
