export interface LeadratPayload {
  name: string;
  state: string;
  city: string;
  location: string;
  budget: string;
  notes: string;
  email: string;
  countryCode: string;
  mobile: string;
  project: string;
  property: string;
  leadExpectedBudget: string;
  propertyType: string;
  submittedDate: string;
  submittedTime: string;
  LeadId: string;
  subsource: string;
  leadStatus: string;
  callRecordingUrl: string;
  scheduledDate: string;
  additionalProperties: Record<string, string>;
}

export class LeadratService {
  private static endpoint = process.env.LEADRAT_ENDPOINT || "https://connect.leadrat.com/api/v1/integration/Website";
  private static apiKey = process.env.LEADRAT_API_KEY || "Y2E4ZTQyNjgtYjhlMi00NzQ1LWFlOGMtYjMyYzg0MzgyMDZh";

  /**
   * Pushes a lead to the LeadRat CRM API
   */
  public static async pushLead(lead: {
    name: string;
    phone: string;
    email?: string | null;
    projectName: string;
    message?: string | null;
  }): Promise<boolean> {
    try {
      // 1. Clean the phone number (keep only digits)
      const cleanPhone = lead.phone.replace(/\D/g, "");
      // Keep only last 10 digits if it starts with country code, but standard is 10 digits
      const mobile = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;

      // 2. Generate date and time formatted in the expected style
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");

      // Format date as DD-MM-YY (e.g. "28-03-18")
      const day = pad(now.getDate());
      const month = pad(now.getMonth() + 1);
      const year = String(now.getFullYear()).slice(-2);
      const submittedDate = `${day}-${month}-${year}`;

      // Format time as HH:MM:SS
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      const submittedTime = `${hours}:${minutes}:${seconds}`;

      // 3. Construct the payload
      const payload: LeadratPayload = {
        name: lead.name,
        state: "",
        city: "",
        location: "",
        budget: "",
        notes: lead.message || "",
        email: lead.email || "",
        countryCode: "91",
        mobile: mobile,
        project: lead.projectName,
        property: "",
        leadExpectedBudget: "",
        propertyType: "",
        submittedDate: submittedDate,
        submittedTime: submittedTime,
        LeadId: "",
        subsource: "",
        leadStatus: "Schedule Site Visit or Schedule Meeting",
        callRecordingUrl: "",
        scheduledDate: "",
        additionalProperties: {},
      };

      console.log(`[LeadratService] Pushing lead to CRM:`, JSON.stringify(payload));

      // 4. Send request
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": this.apiKey,
        },
        body: JSON.stringify([payload]),
      });

      const responseText = await response.text();
      console.log(`[LeadratService] CRM Response Status: ${response.status}`, responseText);

      if (!response.ok) {
        console.error(`[LeadratService] CRM Push Failed. Status: ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error("[LeadratService] Error occurred pushing lead to CRM:", error);
      return false;
    }
  }
}
