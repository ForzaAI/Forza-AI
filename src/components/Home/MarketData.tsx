import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowUp, ArrowDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "../ui/chart";


const cryptoData = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: 61245.82,
    change: 2.54,
    marketCap: 1198432687423,
    volume: 28765345987,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 3324.17,
    change: -0.87,
    marketCap: 398754321654,
    volume: 15432789654,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    price: 129.35,
    change: 5.67,
    marketCap: 52457896321,
    volume: 5678912345,
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    price: 584.21,
    change: 1.23,
    marketCap: 89765432123,
    volume: 3421567890,
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change: -2.18,
    marketCap: 20123456789,
    volume: 1234567890,
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: 0.58,
    change: 3.42,
    marketCap: 30876543210,
    volume: 2345678901,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    change: -1.24,
    marketCap: 19876543210,
    volume: 1987654321,
  },
  {
    id: "forza",
    name: "Forza",
    symbol: "FORZA",
    price: 0.042,
    change: 12.74,
    marketCap: 4200000000,
    volume: 1234567890,
    highlight: true,
  },
];


const chartData = {
  bitcoin: [
    { x: "Jan", y: 42000 },
    { x: "Feb", y: 39000 },
    { x: "Mar", y: 45000 },
    { x: "Apr", y: 52000 },
    { x: "May", y: 49000 },
    { x: "Jun", y: 55000 },
    { x: "Jul", y: 58000 },
    { x: "Aug", y: 61000 },
  ],
  ethereum: [
    { x: "Jan", y: 3200 },
    { x: "Feb", y: 2800 },
    { x: "Mar", y: 3100 },
    { x: "Apr", y: 3500 },
    { x: "May", y: 3300 },
    { x: "Jun", y: 3600 },
    { x: "Jul", y: 3400 },
    { x: "Aug", y: 3324 },
  ],
  solana: [
    { x: "Jan", y: 100 },
    { x: "Feb", y: 90 },
    { x: "Mar", y: 110 },
    { x: "Apr", y: 120 },
    { x: "May", y: 105 },
    { x: "Jun", y: 115 },
    { x: "Jul", y: 125 },
    { x: "Aug", y: 129 },
  ],
  "binance coin": [
    { x: "Jan", y: 500 },
    { x: "Feb", y: 480 },
    { x: "Mar", y: 520 },
    { x: "Apr", y: 540 },
    { x: "May", y: 530 },
    { x: "Jun", y: 550 },
    { x: "Jul", y: 570 },
    { x: "Aug", y: 584 },
  ],
  cardano: [
    { x: "Jan", y: 0.55 },
    { x: "Feb", y: 0.52 },
    { x: "Mar", y: 0.57 },
    { x: "Apr", y: 0.60 },
    { x: "May", y: 0.56 },
    { x: "Jun", y: 0.59 },
    { x: "Jul", y: 0.61 },
    { x: "Aug", y: 0.58 },
  ],
  xrp: [
    { x: "Jan", y: 0.50 },
    { x: "Feb", y: 0.48 },
    { x: "Mar", y: 0.52 },
    { x: "Apr", y: 0.54 },
    { x: "May", y: 0.51 },
    { x: "Jun", y: 0.55 },
    { x: "Jul", y: 0.56 },
    { x: "Aug", y: 0.58 },
  ],
  dogecoin: [
    { x: "Jan", y: 0.14 },
    { x: "Feb", y: 0.13 },
    { x: "Mar", y: 0.15 },
    { x: "Apr", y: 0.16 },
    { x: "May", y: 0.14 },
    { x: "Jun", y: 0.15 },
    { x: "Jul", y: 0.16 },
    { x: "Aug", y: 0.15 },
  ],
  forza: [
    { x: "Jan", y: 0.020 },
    { x: "Feb", y: 0.022 },
    { x: "Mar", y: 0.025 },
    { x: "Apr", y: 0.030 },
    { x: "May", y: 0.033 },
    { x: "Jun", y: 0.036 },
    { x: "Jul", y: 0.038 },
    { x: "Aug", y: 0.042 },
  ],
};

export default function MarketData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);

  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: num > 1_000_000 ? "compact" : "standard",
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getCurrentChartData = () => {
    const cryptoName = selectedCrypto.name.toLowerCase();

    if (!chartData[cryptoName as keyof typeof chartData]) {
      const basePrice = selectedCrypto.price;
      return [
        { x: "Jan", y: basePrice * 0.7 },
        { x: "Feb", y: basePrice * 0.8 },
        { x: "Mar", y: basePrice * 0.75 },
        { x: "Apr", y: basePrice * 0.85 },
        { x: "May", y: basePrice * 0.9 },
        { x: "Jun", y: basePrice * 0.95 },
        { x: "Jul", y: basePrice * 0.98 },
        { x: "Aug", y: basePrice },
      ];
    }
    return chartData[cryptoName as keyof typeof chartData];
  };

  const chartConfig = {
    data: {
      label: "Price",
      theme: {
        light: "var(--primary)",
        dark: "var(--primary)",
      },
    },
  };

  return (
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real-time Market Data
          </h2>
          <p className="mt-4 text-muted-foreground">
            Stay updated with the latest cryptocurrency prices, trends, and market movements.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search cryptocurrencies"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">Market Cap</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">Volume (24h)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCryptos.map((crypto, index) => (
                    <motion.tr
                      key={crypto.id}
                      whileHover={{ backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={crypto.highlight ? "bg-primary/10" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                            {crypto.symbol.charAt(0)}
                          </div>
                          <div>
                            <div>{crypto.name}</div>
                            <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatNumber(crypto.price)}</TableCell>
                      <TableCell className={`text-right ${crypto.change > 0 ? "text-green-500" : "text-red-500"}`}>
                        <div className="flex items-center justify-end gap-1">
                          {crypto.change > 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {Math.abs(crypto.change)}%
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-right sm:table-cell">
                        {formatNumber(crypto.marketCap)}
                      </TableCell>
                      <TableCell className="hidden text-right sm:table-cell">
                        {formatNumber(crypto.volume)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg border bg-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedCrypto.name} ({selectedCrypto.symbol})</h3>
                  <div className="text-3xl font-bold mt-1">{formatNumber(selectedCrypto.price)}</div>
                  <div className={`text-sm ${selectedCrypto.change > 0 ? "text-green-500" : "text-red-500"}`}>
                    <span className="flex items-center gap-1">
                      {selectedCrypto.change > 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {Math.abs(selectedCrypto.change)}% (24h)
                    </span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold"
                >
                  {selectedCrypto.symbol.charAt(0)}
                </motion.div>
              </div>

              <div className="h-[200px] w-full mt-6 rounded-lg border">
                <ChartContainer
                  config={chartConfig}
                  className="h-full w-full"
                >
                  <AreaChart data={getCurrentChartData()} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="x"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                      tickMargin={5}
                    />
                    <YAxis
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) =>
                        selectedCrypto.price > 1000
                          ? `$${Math.round(value / 1000)}k`
                          : `$${value}`
                      }
                      tickMargin={5}
                      width={45}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `${value} 2023`}
                          formatter={(value) => [`$${value}`, "Price"]}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="y"
                      name="data"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="font-medium">{formatNumber(selectedCrypto.marketCap)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Volume (24h)</div>
                  <div className="font-medium">{formatNumber(selectedCrypto.volume)}</div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="mt-6 w-full">Trade {selectedCrypto.symbol}</Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}