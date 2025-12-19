"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";

interface Service {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: {
    url: string;
  };
  isActive: boolean;
  order: number;
}

export default function ServicesListEditor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });

  // Fetch services from backend
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/api/services", {
        params: {
          page: currentPage,
          limit: 6,
          search: searchTerm,
        },
      });
      if (response.data.success) {
        setServices(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch {
      toast.error("Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };



  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await axiosInstance.delete(`/api/services/${id}`);
      if (response.data.success) {
        toast.success("Service deleted successfully");
        fetchServices();
      }
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>



      {/* Services List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading services...</p>
          </div>
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search"
                : "Add your first service to get started"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {services.map((service) => (
              <Card
                key={service._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{service.heroTitle}</h4>
                        <Badge variant={service.isActive ? "default" : "secondary"} className="text-xs">
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {service.heroDescription}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Slug: /{service.slug}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/dashboard/content/services/${service._id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(service._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={pagination.limit}
              totalItems={pagination.total}
            />
          )}
        </>
      )}
    </div>
  );
}
