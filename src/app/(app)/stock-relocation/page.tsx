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
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const relocations = [
  {
    id: "TR-901",
    item: 'Men\'s Kurtas',
    sku: '8435-043-32',
    qty: 250,
    from: 'Warehouse-Delhi-01',
    to: 'Store #2021 (Mumbai)',
    reason: 'High social media trend',
    status: 'In Transit',
  },
  {
    id: "TR-902",
    item: 'Air Fryer XL',
    sku: '1125-987-54',
    qty: 75,
    from: 'Store #1080 (Bangalore)',
    to: 'Store #5301 (Chennai)',
    reason: 'Local demand spike',
    status: 'Pending',
  },
  {
    id: "TR-903",
    item: 'Basmati Rice (5kg)',
    sku: '5543-211-89',
    qty: 400,
    from: 'Warehouse-Punjab-02',
    to: 'Store #3141 (Hyderabad)',
    reason: 'Predicted stockout',
    status: 'Delivered',
  },
  {
    id: "TR-904",
    item: 'Yoga Mats',
    sku: '6789-345-12',
    qty: 150,
    from: 'Store #5301 (Chennai)',
    to: 'Warehouse-BLR-03',
    reason: 'Overstock',
    status: 'Delivered',
  },
  {
    id: "TR-905",
    item: 'Gaming Laptop 15"',
    sku: '2345-678-90',
    qty: 30,
    from: 'Warehouse-Delhi-01',
    to: 'Store #2021 (Mumbai)',
    reason: 'High demand forecast',
    status: 'In Transit',
  },
   {
    id: "TR-906",
    item: 'Cookware Set',
    sku: '4567-890-12',
    qty: 20,
    from: 'Warehouse-BLR-03',
    to: 'Store #1080 (Bangalore)',
    reason: 'Seasonal demand',
    status: 'Pending',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "capitalize border";
  switch (status) {
    case "In Transit":
      return <Badge variant="secondary" className={`${baseClasses} bg-blue-500/20 text-blue-400 border-blue-500/30`}>{status}</Badge>;
    case "Pending":
      return <Badge variant="secondary" className={`${baseClasses} bg-yellow-500/20 text-yellow-400 border-yellow-500/30`}>{status}</Badge>;
    case "Delivered":
      return <Badge variant="secondary" className={`${baseClasses} bg-green-500/20 text-green-400 border-green-500/30`}>{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function StockRelocationPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Intelligent Stock Balancing</h1>
        <p className="text-muted-foreground mt-1">
          Proactively move inventory to where it's needed most across India. Our system identifies demand spikes and overstock situations, automating relocation orders to optimize availability and reduce holding costs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Relocation Orders</CardTitle>
          <CardDescription>
            A prioritized list of stock movements to meet predicted demand and prevent stockouts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="hidden md:table-cell">Qty</TableHead>
                <TableHead>Route</TableHead>
                <TableHead className="hidden sm:table-cell">Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relocations.map((relocation) => (
                <TableRow key={relocation.id}>
                  <TableCell>
                    <div className="font-medium">{relocation.item}</div>
                    <div className="text-xs text-muted-foreground">{relocation.sku}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{relocation.qty}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{relocation.from}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span>{relocation.to}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{relocation.reason}</TableCell>
                  <TableCell><StatusBadge status={relocation.status} /></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Print Label</DropdownMenuItem>
                        <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
