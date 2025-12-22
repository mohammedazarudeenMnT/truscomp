"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import {
  Save,
  Building2,
  Settings as SettingsIcon,
  Loader2,
  Mail,
  Send,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateGeneralSettings } from "@/lib/settings-api";
import {
  getEmailConfiguration,
  updateEmailConfiguration,
  testEmailConfiguration,
} from "@/lib/email-config-api";
import ThemeColorSettings from "@/components/dashboard/theme-color-settings";
import { ImageUpload } from "@/components/ui/image-upload";
// import { RanksTab } from "@/components/settings/RanksTab"; // Removed

type TabType = "general" | "email" | "theme";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pendingEmailChange, setPendingEmailChange] = useState<string | null>(
    null
  );

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Truscomp",
    companyEmail: "info@truscomp.com",
    companyPhone: "+91 1234567890",
    companyAddress: "123 Business Street, City, State, PIN",
    companyDescription:
      "A transparent, automated MLM system built on Binary + PV earning model",
    companyLogo: "/images/logo/logo.webp" as string | null,
  });

  // SEO and Hero settings removed

  // Email Configuration State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    senderEmail: "",
  });

  const [testEmail, setTestEmail] = useState("");
  const [testingEmail, setTestingEmail] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      // Fetch both settings in parallel using Promise.all
      const [response, emailResponse] = await Promise.all([
        getSettings(),
        getEmailConfiguration(),
      ]);

      // Update general settings
      if (response.success && response.data) {
        const data = response.data;
        setGeneralSettings({
          companyName: data.companyName || "Truscomp",
          companyEmail: data.companyEmail || "info@truscomp.com",
          companyPhone: data.companyPhone || "+91 1234567890",
          companyAddress:
            data.companyAddress || "123 Business Street, City, State, PIN",
          companyDescription:
            data.companyDescription ||
            "A transparent, automated MLM system built on Binary + PV earning model",
          companyLogo: data.companyLogo || "/images/logo/logo.webp",
        });

        setPendingEmailChange(data.pendingEmailChange || null);
      }

      // Update email settings
      if (emailResponse.success && emailResponse.emailConfig) {
        setEmailSettings({
          smtpHost: emailResponse.emailConfig.smtpHost || "smtp.gmail.com",
          smtpPort: emailResponse.emailConfig.smtpPort || "587",
          smtpUsername: emailResponse.emailConfig.smtpUsername || "",
          smtpPassword: emailResponse.emailConfig.smtpPassword || "",
          senderEmail: emailResponse.emailConfig.senderEmail || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast.error("Failed to load settings", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let response;

      // Save based on active tab
      if (activeTab === "general") {
        response = await updateGeneralSettings(generalSettings);
      } else if (activeTab === "email") {
        response = await updateEmailConfiguration(emailSettings);
      }

      if (response?.success) {
        // Update pendingEmailChange from response data if available
        if (response.data && activeTab === "general") {
          setPendingEmailChange(response.data.pendingEmailChange || null);
        }

        // Check for warnings (e.g., email verification failed to send)
        if (response.warning) {
          toast.warning("Settings saved with warnings", {
            description: response.warning,
            duration: 6000,
          });
        } else {
          toast.success("Settings saved successfully!", {
            description: response.message || "Your changes have been applied.",
          });
        }

        // If email was changed and verification sent, showing specific info might be helpful
        if (response.emailChanged) {
          toast.info("Verification Email Sent", {
            description:
              "Please check the new email address to verify the change.",
            duration: 8000,
          });
        }
      }
    } catch (error) {
      console.error("Save error:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        apiError.message ||
        "Please try again later.";
      toast.error("Failed to save settings", {
        description: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general" as TabType, label: "General", icon: Building2 },
    { id: "email" as TabType, label: "Email Configuration", icon: Mail },
    { id: "theme" as TabType, label: "Theme & Appearance", icon: Palette },
  ];

  if (loading) {
    return (
      <PageContainer maxWidth="full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="full">
      <PageHeader
        icon={<SettingsIcon className="w-6 h-6 text-white" />}
        title="Settings"
        subtitle="Manage your application settings and configurations"
        action={
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-400 hover:bg-primary-500 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        }
      />

      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/30">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "text-primary-600 border-b-2 border-primary-600 bg-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[600px]">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Pending Email Verification Alert */}
              {pendingEmailChange && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">
                      Pending Email Verification
                    </h4>
                    <p className="text-sm mt-1">
                      A request to change the company email to{" "}
                      <strong className="font-medium">
                        {pendingEmailChange}
                      </strong>{" "}
                      is pending. Please check that email inbox for a
                      verification link to complete the change.
                    </p>
                  </div>
                </div>
              )}

              {/* Company Logo Section */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Company Logo
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your company logo. This will be displayed across the
                  entire application.
                </p>
                <ImageUpload
                  label="Company Logo"
                  value={generalSettings.companyLogo}
                  onChange={(value) =>
                    setGeneralSettings({
                      ...generalSettings,
                      companyLogo: value,
                    })
                  }
                  aspectRatio="square"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Company Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={generalSettings.companyName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyName: e.target.value,
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={generalSettings.companyEmail}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyEmail: e.target.value,
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyPhone">Company Phone</Label>
                    <Input
                      id="companyPhone"
                      value={generalSettings.companyPhone}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyPhone: e.target.value,
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Input
                      id="companyAddress"
                      value={generalSettings.companyAddress}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyAddress: e.target.value,
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="companyDescription">
                      Company Description
                    </Label>
                    <Textarea
                      id="companyDescription"
                      value={generalSettings.companyDescription}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyDescription: e.target.value,
                        })
                      }
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Configuration Tab */}
          {activeTab === "email" && (
            <div className="space-y-6 min-h-[600px]">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Email Configuration
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure SMTP settings for sending emails from the platform
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            smtpHost: e.target.value,
                          })
                        }
                        className="mt-2"
                        placeholder="smtp.gmail.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        SMTP server hostname
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            smtpPort: e.target.value,
                          })
                        }
                        className="mt-2"
                        placeholder="587"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Usually 587 for TLS or 465 for SSL
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={emailSettings.smtpUsername}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            smtpUsername: e.target.value,
                          })
                        }
                        className="mt-2"
                        placeholder="your-email@gmail.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        SMTP authentication username
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            smtpPassword: e.target.value,
                          })
                        }
                        className="mt-2"
                        placeholder="••••••••••••••••"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        For Gmail, use App Password if 2FA is enabled
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input
                        id="senderEmail"
                        type="email"
                        value={emailSettings.senderEmail}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            senderEmail: e.target.value,
                          })
                        }
                        className="mt-2"
                        placeholder="noreply@truscomp.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Email address that will appear as sender
                      </p>
                    </div>
                  </div>

                  {/* Test Email Section */}
                  <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Test Email Configuration
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send a test email to verify your SMTP settings are working
                      correctly
                    </p>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          type="email"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          placeholder="Enter test email address"
                          disabled={testingEmail}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={async () => {
                          if (!testEmail || !testEmail.includes("@")) {
                            toast.error("Invalid email", {
                              description: "Please enter a valid email address",
                            });
                            return;
                          }

                          setTestingEmail(true);
                          try {
                            const response = await testEmailConfiguration({
                              testEmail,
                              message:
                                "This is a test email from the Truscomp admin panel.",
                            });

                            if (response.success) {
                              toast.success("Test email sent!", {
                                description: `Email sent successfully to ${testEmail}`,
                              });
                            } else {
                              toast.error("Test failed", {
                                description:
                                  response.message ||
                                  "Failed to send test email",
                              });
                            }
                          } catch (error) {
                            const apiError = error as ApiError;
                            const errorMessage =
                              apiError.response?.data?.message ||
                              apiError.message ||
                              "Failed to send test email";
                            toast.error("Test failed", {
                              description: errorMessage,
                            });
                          } finally {
                            setTestingEmail(false);
                          }
                        }}
                        disabled={testingEmail || !testEmail}
                        className="bg-primary-400 hover:bg-primary-500"
                      >
                        {testingEmail ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Test
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Gmail Instructions */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Gmail Setup Instructions
                    </h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Enable 2-Step Verification in your Google Account</li>
                      <li>Go to Google Account → Security → App Passwords</li>
                      <li>Generate a new App Password for &quot;Mail&quot;</li>
                      <li>
                        Use the 16-character App Password in the SMTP Password
                        field
                      </li>
                      <li>Use your full Gmail address as SMTP Username</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theme & Appearance Tab */}
          {activeTab === "theme" && (
            <div className="space-y-6 min-h-[600px]">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Theme Color
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Customize the primary color of your application. This will
                  affect buttons, links, and other interactive elements
                  throughout the platform.
                </p>

                <ThemeColorSettings />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Note</h4>
                <p className="text-sm text-blue-800">
                  After changing the theme color, the page will automatically
                  reload to apply the new color scheme across the entire
                  application.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
