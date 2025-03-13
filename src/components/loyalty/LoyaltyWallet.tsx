import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ArrowUpRight, ArrowDownRight, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Transaction {
  id: string;
  date: string;
  type: "earned" | "spent" | "transferred" | "received";
  amount: number;
  description: string;
}

interface LoyaltyWalletProps {
  coinBalance?: number;
  transactions?: Transaction[];
}

const LoyaltyWallet: React.FC<LoyaltyWalletProps> = ({
  coinBalance = 1250,
  transactions = [
    {
      id: "tx1",
      date: "2023-06-15",
      type: "earned",
      amount: 250,
      description: "Purchase reward",
    },
    {
      id: "tx2",
      date: "2023-06-10",
      type: "transferred",
      amount: 500,
      description: "Transferred to Ahmed",
    },
    {
      id: "tx3",
      date: "2023-06-05",
      type: "spent",
      amount: 300,
      description: "Redeemed for discount",
    },
    {
      id: "tx4",
      date: "2023-06-01",
      type: "received",
      amount: 750,
      description: "Received from Fatima",
    },
  ],
}) => {
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const { toast } = useToast();

  const handleTransfer = () => {
    // This would handle the transfer process in a real application
    if (!recipientUsername || !transferAmount) return;

    const amount = parseInt(transferAmount);
    if (isNaN(amount) || amount <= 0 || amount > coinBalance) return;

    console.log(`Transferring ${amount} coins to ${recipientUsername}`);

    toast({
      title: "Transfer Successful",
      description: `You have transferred ${amount} coins to ${recipientUsername}.`,
      variant: "default",
    });

    setIsTransferDialogOpen(false);
    setRecipientUsername("");
    setTransferAmount("");
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Coins className="mr-2 text-yellow-600" />
          Loyalty Wallet
        </h2>
        <p className="text-gray-600">
          Manage your coins and view transaction history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-2 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle>Coin Balance</CardTitle>
            <CardDescription>
              Your available coins for transfers and purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="text-5xl font-bold text-yellow-600">
                {coinBalance}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => setIsTransferDialogOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              Transfer Coins
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Earned</span>
                <span className="font-medium text-green-600">2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Spent</span>
                <span className="font-medium text-red-600">1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Net Transfers</span>
                <span className="font-medium text-blue-600">+250</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Recent activity in your loyalty wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        transaction.type === "earned"
                          ? "bg-green-100 text-green-800"
                          : transaction.type === "spent"
                            ? "bg-red-100 text-red-800"
                            : transaction.type === "transferred"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {transaction.type === "earned"
                        ? "Earned"
                        : transaction.type === "spent"
                          ? "Spent"
                          : transaction.type === "transferred"
                            ? "Transferred"
                            : "Received"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span
                      className={
                        transaction.type === "earned" ||
                        transaction.type === "received"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.type === "earned" ||
                      transaction.type === "received"
                        ? "+"
                        : "-"}
                      {transaction.amount}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isTransferDialogOpen}
        onOpenChange={setIsTransferDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Coins</DialogTitle>
            <DialogDescription>
              Send coins to another user from your balance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Username</Label>
              <Input
                id="recipient"
                placeholder="Enter username"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                min="1"
                max={coinBalance.toString()}
              />
              <p className="text-xs text-gray-500">
                Available balance: {coinBalance} coins
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTransferDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={
                !recipientUsername ||
                !transferAmount ||
                parseInt(transferAmount) <= 0 ||
                parseInt(transferAmount) > coinBalance
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyWallet;
