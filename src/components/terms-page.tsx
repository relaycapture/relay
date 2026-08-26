'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface TermsPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function TermsPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: TermsPageProps) {
  return (
    <div
      id="terms-page"
      className={`min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300 ${
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#070709] text-[#F4F4F2]'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-12rem)] justify-between">
        <div>
          {/* Back navigation */}
          <div className="mb-10">
            <button
              onClick={onBackToHome}
              data-cursor="grow"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-colors border ${
                isLightMode
                  ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Home</span>
            </button>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1
              className={`text-3xl sm:text-5xl font-semibold font-sans tracking-tight leading-tight mb-3 ${
                isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
            >
              Terms of Service
            </h1>

            <p className="font-mono text-xs text-neutral-400">
              Last updated: August 13, 2026
            </p>
          </div>

          {/* Content Area */}
          <div
            className={`rc-grain-surface p-8 sm:p-12 rounded-3xl border min-h-[350px] leading-relaxed text-sm sm:text-base font-sans mb-16 space-y-8 ${
              isLightMode
                ? 'bg-white border-black/10 text-neutral-800'
                : 'bg-[#101014] border-white/10 text-neutral-300'
            }`}
          >
            {/* AGREEMENT TO OUR LEGAL TERMS */}
            <div className="space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                AGREEMENT TO OUR LEGAL TERMS
              </h2>
              <p className="leading-relaxed">
                We are Relay Capture (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), operating the website <a href="https://relaycapture.com" className="text-blue-500 hover:underline">https://relaycapture.com</a> (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
              </p>
              <p className="leading-relaxed">
                You can contact us by email at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
              <p className="leading-relaxed">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Relay Capture, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p className="leading-relaxed">
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
              </p>
              <p className="leading-relaxed">
                The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
              </p>
              <p className="leading-relaxed">
                We recommend that you print a copy of these Legal Terms for your records.
              </p>
            </div>

            {/* TABLE OF CONTENTS */}
            <div className={`p-6 rounded-2xl border ${isLightMode ? 'bg-black/[0.02] border-black/10' : 'bg-white/[0.02] border-white/10'}`}>
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider mb-4 ${isLightMode ? 'text-black' : 'text-white'}`}>
                TABLE OF CONTENTS
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
                <li>1. OUR SERVICES</li>
                <li>2. INTELLECTUAL PROPERTY RIGHTS</li>
                <li>3. USER REPRESENTATIONS</li>
                <li>4. PURCHASES AND PAYMENT</li>
                <li>5. CANCELLATION</li>
                <li>6. PROHIBITED ACTIVITIES</li>
                <li>7. USER GENERATED CONTRIBUTIONS</li>
                <li>8. CONTRIBUTION LICENSE</li>
                <li>9. SERVICES MANAGEMENT</li>
                <li>10. PRIVACY POLICY</li>
                <li>11. TERM AND TERMINATION</li>
                <li>12. MODIFICATIONS AND INTERRUPTIONS</li>
                <li>13. GOVERNING LAW</li>
                <li>14. DISPUTE RESOLUTION</li>
                <li>15. CORRECTIONS</li>
                <li>16. DISCLAIMER</li>
                <li>17. LIMITATIONS OF LIABILITY</li>
                <li>18. INDEMNIFICATION</li>
                <li>19. USER DATA</li>
                <li>20. ELECTRONIC COMMUNICATIONS</li>
                <li>21. CALIFORNIA USERS AND RESIDENTS</li>
                <li>22. MISCELLANEOUS</li>
                <li>23. CONTACT US</li>
              </ol>
            </div>

            {/* 1. OUR SERVICES */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                1. OUR SERVICES
              </h2>
              <p className="leading-relaxed">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
              </p>
            </div>

            {/* 2. INTELLECTUAL PROPERTY RIGHTS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                2. INTELLECTUAL PROPERTY RIGHTS
              </h2>
              <h3 className="font-semibold text-sm sm:text-base">Our intellectual property</h3>
              <p className="leading-relaxed">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
              </p>
              <p className="leading-relaxed">
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
              </p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">Your use of our Services</h3>
              <p className="leading-relaxed">
                Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.
              </p>
              <p className="leading-relaxed">
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </div>

            {/* 3. USER REPRESENTATIONS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                3. USER REPRESENTATIONS
              </h2>
              <p className="leading-relaxed">
                By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.
              </p>
            </div>

            {/* 4. PURCHASES AND PAYMENT */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                4. PURCHASES AND PAYMENT
              </h2>
              <p className="leading-relaxed">
                We accept major credit cards, PayPal, Google Pay, and Apple Pay through our Merchant of Record, Paddle. You agree to provide current, complete, and accurate payment information. Sales tax is added where required. Prices are subject to change; the price shown at checkout is the price charged. All payments are in US dollars.
              </p>
              <p className="leading-relaxed">
                Snapshot Report and Audit + Fix-It Kit are one-time purchases. Payment is captured at checkout and your deliverable is generated and made available immediately after payment confirms. There is no recurring charge for these products.
              </p>
              <p className="leading-relaxed">
                Continuous Monitoring is a recurring monthly subscription, billed on the date of initial purchase each month until canceled.
              </p>
            </div>

            {/* 5. CANCELLATION */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                5. CANCELLATION
              </h2>
              <p className="leading-relaxed">
                (SUBSCRIPTION PRODUCTS ONLY) You may cancel Continuous Monitoring at any time; cancellation takes effect at the end of the current billing period, and you will not be charged again. Snapshot Report and Audit + Fix-It Kit, as one-time purchases, have nothing to cancel.
              </p>
            </div>

            {/* 6. PROHIBITED ACTIVITIES */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                6. PROHIBITED ACTIVITIES
              </h2>
              <p className="leading-relaxed">
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
            </div>

            {/* 7. USER GENERATED CONTRIBUTIONS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                7. USER GENERATED CONTRIBUTIONS
              </h2>
              <p className="leading-relaxed">
                The Services does not offer users to submit or post content.
              </p>
            </div>

            {/* 8. CONTRIBUTION LICENSE */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                8. CONTRIBUTION LICENSE
              </h2>
              <p className="leading-relaxed">
                By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
              </p>
            </div>

            {/* 9. SERVICES MANAGEMENT */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                9. SERVICES MANAGEMENT
              </h2>
              <p className="leading-relaxed">
                We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; (3) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
              </p>
            </div>

            {/* 10. PRIVACY POLICY */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                10. PRIVACY POLICY
              </h2>
              <p className="leading-relaxed">
                We care about data privacy and security. Please review our Privacy Policy: <a href="https://relaycapture.com/privacy" className="text-blue-500 hover:underline">https://relaycapture.com/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Egypt. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Egypt, then through your continued use of the Services, you are transferring your data to Egypt, and you expressly consent to have your data transferred to and processed in Egypt.
              </p>
            </div>

            {/* 11. TERM AND TERMINATION */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                11. TERM AND TERMINATION
              </h2>
              <p className="leading-relaxed">
                These Legal Terms shall remain in full force and effect while you use the Services. WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES, TO ANY PERSON FOR ANY REASON.
              </p>
            </div>

            {/* 12. MODIFICATIONS AND INTERRUPTIONS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                12. MODIFICATIONS AND INTERRUPTIONS
              </h2>
              <p className="leading-relaxed">
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice.
              </p>
            </div>

            {/* 13. GOVERNING LAW */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                13. GOVERNING LAW
              </h2>
              <p className="leading-relaxed">
                These Legal Terms shall be governed by and defined following the laws of Egypt. Relay Capture and yourself irrevocably consent that the courts of Egypt shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
              </p>
            </div>

            {/* 14. DISPUTE RESOLUTION */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                14. DISPUTE RESOLUTION
              </h2>
              <h3 className="font-semibold text-sm sm:text-base">Informal Negotiations</h3>
              <p className="leading-relaxed">
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
              </p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">Binding Arbitration</h3>
              <p className="leading-relaxed">
                If the parties are unable to resolve the dispute through informal negotiation, the dispute shall be finally resolved by arbitration. The number of arbitrators shall be one (1). The seat, or legal place, or arbitration shall be Cairo, Egypt. The language of the proceedings shall be English. The governing law of these Legal Terms shall be substantive law of Egypt.
              </p>
            </div>

            {/* 15. CORRECTIONS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                15. CORRECTIONS
              </h2>
              <p className="leading-relaxed">
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
              </p>
            </div>

            {/* 16. DISCLAIMER */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                16. DISCLAIMER
              </h2>
              <p className="leading-relaxed uppercase font-mono text-xs sm:text-sm">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
              </p>
            </div>

            {/* 17. LIMITATIONS OF LIABILITY */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                17. LIMITATIONS OF LIABILITY
              </h2>
              <p className="leading-relaxed uppercase font-mono text-xs sm:text-sm">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES.
              </p>
            </div>

            {/* 18. INDEMNIFICATION */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                18. INDEMNIFICATION
              </h2>
              <p className="leading-relaxed">
                You agree to defend, indemnify, and hold us harmless from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the Services.
              </p>
            </div>

            {/* 19. USER DATA */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                19. USER DATA
              </h2>
              <p className="leading-relaxed">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services. You are solely responsible for all data that you transmit.
              </p>
            </div>

            {/* 20. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                20. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
              </h2>
              <p className="leading-relaxed">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications.
              </p>
            </div>

            {/* 21. CALIFORNIA USERS AND RESIDENTS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                21. CALIFORNIA USERS AND RESIDENTS
              </h2>
              <p className="leading-relaxed">
                If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
              </p>
            </div>

            {/* 22. MISCELLANEOUS */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                22. MISCELLANEOUS
              </h2>
              <p className="leading-relaxed">
                These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us.
              </p>
            </div>

            {/* 23. CONTACT US */}
            <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                23. CONTACT US
              </h2>
              <p className="leading-relaxed">
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
              </p>
              <div className="font-mono text-sm space-y-1">
                <p className="font-bold">Relay Capture</p>
                <p><a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterBottom
          isLightMode={isLightMode}
          onNavigateToTerms={onNavigateToTerms}
          onNavigateToPrivacy={onNavigateToPrivacy}
          onNavigateToRefunds={onNavigateToRefunds}
        />
      </div>
    </div>
  );
}
