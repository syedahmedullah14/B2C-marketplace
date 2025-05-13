
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Package, CreditCard, MapPin, LogOut } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const MOCK_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joinedDate: "January 2023",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  }
};

// Mock order history
const MOCK_ORDERS = [
  {
    id: "ORD-12345",
    date: "2023-05-15",
    total: 156.99,
    status: "Delivered",
    items: 3
  },
  {
    id: "ORD-12346",
    date: "2023-04-22",
    total: 89.95,
    status: "Delivered",
    items: 2
  },
  {
    id: "ORD-12347",
    date: "2023-03-10",
    total: 45.50,
    status: "Delivered",
    items: 1
  }
];

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(MOCK_USER);
  
  const handleSaveProfile = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent as keyof typeof userData],
          [child]: value
        }
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };
  
  const handleLogout = () => {
    toast.info("Logged out successfully");
    // In a real app, this would clear auth state and redirect
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="profile" className="flex gap-2">
              <User size={16} />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex gap-2">
              <Package size={16} />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex gap-2">
              <CreditCard size={16} />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex gap-2">
              <MapPin size={16} />
              <span>Addresses</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {!editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">{userData.joinedDate}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                      <p className="font-medium">{userData.address.street}</p>
                      <p className="font-medium">
                        {userData.address.city}, {userData.address.state} {userData.address.zipCode}
                      </p>
                      <p className="font-medium">{userData.address.country}</p>
                    </div>
                    <Button 
                      onClick={() => setEditMode(true)}
                      className="mt-4 bg-marketplace-primary hover:bg-marketplace-secondary"
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <p className="font-medium">Shipping Address</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street</Label>
                          <Input 
                            id="street"
                            name="address.street"
                            value={userData.address.street}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            name="address.city"
                            value={userData.address.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state"
                            name="address.state"
                            value={userData.address.state}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input 
                            id="zipCode"
                            name="address.zipCode"
                            value={userData.address.zipCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            id="country"
                            name="address.country"
                            value={userData.address.country}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-marketplace-primary hover:bg-marketplace-secondary"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditMode(false);
                          setUserData(MOCK_USER);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {MOCK_ORDERS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_ORDERS.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <p>{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                    <div className="mt-6">
                      <Button asChild className="bg-marketplace-primary hover:bg-marketplace-secondary">
                        <a href="/">Start Shopping</a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No payment methods</h3>
                  <p className="mt-1 text-sm text-gray-500">You haven't added any payment methods yet.</p>
                  <div className="mt-6">
                    <Button className="bg-marketplace-primary hover:bg-marketplace-secondary">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Default Address</h3>
                      <p className="mt-1">{userData.name}</p>
                      <p>{userData.address.street}</p>
                      <p>{userData.address.city}, {userData.address.state} {userData.address.zipCode}</p>
                      <p>{userData.address.country}</p>
                      <p className="mt-1">{userData.phone}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 bg-marketplace-primary hover:bg-marketplace-secondary">
                  Add New Address
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
