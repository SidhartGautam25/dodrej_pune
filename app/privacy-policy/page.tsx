import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Lock,
  FileText,
  Info,
} from "lucide-react";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer & Privacy Policy | Godrej Properties Pune",
  description:
    "Disclaimer and Privacy Policy for Godrej Properties Pune. Information regarding marketing collaterals, RERA compliance, user data collection, security, and authorized channel partner disclosures.",
  alternates: {
    canonical: "https://godrejpropertypune.com/privacy-policy",
  },
  openGraph: {
    title: "Disclaimer & Privacy Policy | Godrej Properties Pune",
    description:
      "Disclaimer and Privacy Policy for Godrej Properties Pune - Authorized Marketing Partner (958 Real Pvt. Ltd).",
    url: "https://godrejpropertypune.com/privacy-policy",
    siteName: "Godrej Property Pune",
    images: [
      {
        url: "/godrej-logo-official.png",
        width: 800,
        height: 600,
        alt: "Godrej Properties Pune Official Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-tan text-text-main font-sans selection:bg-accent-gold selection:text-white">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform"
          >
            <div className="bg-white p-1 rounded shadow-sm border border-slate-100 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/godrej-logo-official.png"
                alt="Godrej Properties Logo"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs tracking-widest text-primary uppercase font-bold">
                Godrej Properties Pune
              </span>
              <span className="text-[10px] text-text-muted tracking-wider">
                Authorized Marketing Partner
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full border border-accent-gold-dark/40 text-accent-gold-dark hover:bg-accent-gold hover:text-white transition-all duration-300 shadow-sm bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Page Hero Header */}
          <div className="text-center space-y-3 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/30 text-accent-gold-dark text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal &amp; Compliance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight">
              Disclaimer &amp; Privacy Policy
            </h1>
            <div className="w-16 h-1 bg-accent-gold rounded-full mx-auto my-2" />
            <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-medium">
              Please review our disclosures, terms of use, and privacy
              commitments for this website.
            </p>
          </div>

          {/* Authorized Marketing Partner Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-accent-gold/40 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent-gold-dark shrink-0 mt-0.5" />
              <div className="space-y-3 text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
                <p>
                  The content presented on this website is solely for
                  informational purposes and does not constitute a service
                  offer. Prices mentioned here are subject to change without
                  prior notification, and the availability of the listed
                  properties is not assured. Images showcased are illustrative
                  and may not precisely represent the actual properties.
                </p>
                <p>
                  Kindly be advised that this website operates as an authorized
                  marketing partner (958 Real Pvt. Ltd). For necessary
                  processing, we may share data with Real Estate Regulatory
                  Authority (RERA) registered brokers/companies. Additionally,
                  updates and information may be sent to the registered mobile
                  number or email ID.
                </p>
                <p>
                  All rights reserved. This website&apos;s content, design, and
                  data are protected by copyright and other intellectual
                  property rights. Unauthorized use or reproduction of the
                  content may be subject to legal repercussions. For precise and
                  current information on services, pricing, availability, or any
                  other details, we recommend you contact us directly via the
                  provided contact information on this website. We appreciate
                  your visit.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Disclaimer */}
          <section className="p-6 md:p-8 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-black/[0.06] pb-4">
              <AlertTriangle className="w-6 h-6 text-accent-gold-dark" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">
                Disclaimer
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
              <p>
                This website is only for the purpose of providing information
                regarding real estate projects in different regions. By
                accessing this website, the viewer confirms that the information
                including brochures and marketing collaterals on this website is
                solely for informational purposes and the viewer has not relied
                on this information for making any booking/purchase in any
                project of the company. Nothing on this website constitutes
                advertising, marketing, booking, selling or an offer for sale,
                or invitation to purchase a unit in any project by the company.
                The company is not liable for any consequence of any action
                taken by the viewer relying on such material/ information on
                this website.
              </p>

              <p>
                Please also note that the company has not verified the
                information and the compliances of the projects. Further, the
                company has not checked the RERA (Real Estate Regulation Act
                2016) registration status of the real estate projects listed
                herein. The company does not make any representation in regards
                to the compliances done against these projects. You should make
                yourself aware about the RERA registration status of the listed
                real estate projects before purchasing property.
              </p>

              <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 text-accent-gold-dark font-bold text-center">
                This site is for information purpose only and should not be
                treated as the official website.
              </div>
            </div>
          </section>

          {/* Section 2: Privacy Policy */}
          <section className="p-6 md:p-8 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-black/[0.06] pb-4">
              <Lock className="w-6 h-6 text-accent-gold-dark" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">
                Privacy Policy
              </h2>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
              In our endeavor and commitment of protecting your personal
              information, we have designed this comprehensive privacy policy.
              This is to keep your interests and information safe on our
              website.
            </p>

            {/* Subsection: Updation of privacy policy */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base md:text-lg font-bold text-primary flex items-center gap-2 font-serif">
                <FileText className="w-4 h-4 text-accent-gold-dark" />
                <span>Updation of privacy policy</span>
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
                This privacy policy is subject to undergo change and review
                without any prior notice or approval. So to keep yourself
                updated on the changes introduced, please keep visiting and
                reviewing the terms and conditions of this privacy policy.
              </p>
            </div>

            {/* Subsection: User information */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base md:text-lg font-bold text-primary flex items-center gap-2 font-serif">
                <FileText className="w-4 h-4 text-accent-gold-dark" />
                <span>User information</span>
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
                By using our website, you agree to abide by the rules laid out
                by us and consent to collection and use of all such information
                that you may furnish to, or through, our website. In some cases,
                while you visit our website, you may not need to provide any
                personal information. But in certain instances, we must have
                your personal information in order for us to grant you access to
                some of the links or sites. Such links/ pages may ask for your
                name, e-mail address, phone number etc. The information
                furnished by you is used to provide relevant products and
                services and to acknowledge receipt of your communication or to
                send out information and updates to you. You have option of
                requesting removal from our mailing list. We do not give away
                your personal information to any third party.
              </p>
            </div>

            {/* Subsection: Security */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base md:text-lg font-bold text-primary flex items-center gap-2 font-serif">
                <FileText className="w-4 h-4 text-accent-gold-dark" />
                <span>Security</span>
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
                To ensure security while transferring sensitive information, all
                the ongoing transmissions between client and server are
                encrypted using advanced and standard protocols. We also
                practice restricted access by employees and hold them to high
                levels of confidentiality.
              </p>
            </div>

            {/* Subsection: Use of cookies */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base md:text-lg font-bold text-primary flex items-center gap-2 font-serif">
                <FileText className="w-4 h-4 text-accent-gold-dark" />
                <span>Use of cookies</span>
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium">
                We may use cookies for security, session continuity, and
                customization purposes. In case of a user opting to reject a
                cookie, he/ she may not be able to gain access to some of the
                limited services or use some features of the site.
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-text-main/90 font-medium pt-2">
                In case of any queries or suggestions regarding privacy
                statement or your dealings with this web site, please contact:{" "}
                <a
                  href="tel:+918010442222"
                  className="text-accent-gold-dark hover:underline font-bold"
                >
                  +91 80104 42222
                </a>{" "}
                or email us directly via the contact options on this website.
              </p>
            </div>
          </section>

          {/* Bottom navigation link */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-gold-dark hover:text-primary transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Godrej Properties Pune Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
