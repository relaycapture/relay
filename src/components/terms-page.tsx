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
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#08080a] rc-page-grain-08080a text-[#F4F4F2]'
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

          <div className="space-y-6 sm:space-y-8 font-sans">
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Legal Specification</div>
              <h1 className={`text-3xl sm:text-4xl font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                Terms of Service
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last updated: August 13, 2026</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <section className="space-y-3">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  AGREEMENT TO OUR LEGAL TERMS
                </h2>
                <p>
                  We are Relay Capture ("Company," "we," "us," "our"), operating the website{' '}
                  <a href="https://relaycapture.com" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    https://relaycapture.com
                  </a>{' '}
                  (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                </p>
                <p>
                  You can contact us by email at{' '}
                  <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                    sam@relaycapture.com
                  </a>.
                </p>
                <p>
                  These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Relay Capture, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
                <p>
                  Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
                </p>
                <p>
                  The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                </p>
                <p>
                  We recommend that you print a copy of these Legal Terms for your records.
                </p>
              </section>

              <section className="space-y-2 pt-2 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  TABLE OF CONTENTS
                </h2>
                <ol className="list-decimal list-inside space-y-1 text-xs font-mono">
                  <li>OUR SERVICES</li>
                  <li>INTELLECTUAL PROPERTY RIGHTS</li>
                  <li>USER REPRESENTATIONS</li>
                  <li>PURCHASES AND PAYMENT</li>
                  <li>CANCELLATION</li>
                  <li>PROHIBITED ACTIVITIES</li>
                  <li>USER GENERATED CONTRIBUTIONS</li>
                  <li>CONTRIBUTION LICENSE</li>
                  <li>SERVICES MANAGEMENT</li>
                  <li>PRIVACY POLICY</li>
                  <li>TERM AND TERMINATION</li>
                  <li>MODIFICATIONS AND INTERRUPTIONS</li>
                  <li>GOVERNING LAW</li>
                  <li>DISPUTE RESOLUTION</li>
                  <li>CORRECTIONS</li>
                  <li>DISCLAIMER</li>
                  <li>LIMITATIONS OF LIABILITY</li>
                  <li>INDEMNIFICATION</li>
                  <li>USER DATA</li>
                  <li>ELECTRONIC COMMUNICATIONS</li>
                  <li>CALIFORNIA USERS AND RESIDENTS</li>
                  <li>MISCELLANEOUS</li>
                  <li>CONTACT US</li>
                </ol>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  1. OUR SERVICES
                </h2>
                <p>
                  The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  2. INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <h3 className={`text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`}>
                  Our intellectual property
                </h3>
                <p>
                  We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                </p>
                <p>
                  Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.
                </p>
                <h3 className={`text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`}>
                  Your use of our Services
                </h3>
                <p>
                  Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.
                </p>
                <p>
                  Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  3. USER REPRESENTATIONS
                </h2>
                <p>
                  By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  4. PURCHASES AND PAYMENT
                </h2>
                <p>
                  We accept major credit cards, PayPal, Google Pay, and Apple Pay through our Merchant of Record, Paddle. You agree to provide current, complete, and accurate payment information. Sales tax is added where required. Prices are subject to change; the price shown at checkout is the price charged. All payments are in US dollars.
                </p>
                <p>
                  Snapshot Report and Audit + Fix-It Kit are one-time purchases. Payment is captured at checkout and your deliverable is generated and made available immediately after payment confirms. There is no recurring charge for these products.
                </p>
                <p>
                  Continuous Monitoring is a recurring monthly subscription, billed on the date of initial purchase each month until canceled.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  5. CANCELLATION
                </h2>
                <p>
                  (SUBSCRIPTION PRODUCTS ONLY) You may cancel Continuous Monitoring at any time; cancellation takes effect at the end of the current billing period, and you will not be charged again. Snapshot Report and Audit + Fix-It Kit, as one-time purchases, have nothing to cancel.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  6. PROHIBITED ACTIVITIES
                </h2>
                <p>
                  You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  7. USER GENERATED CONTRIBUTIONS
                </h2>
                <p>
                  The Services does not offer users to submit or post content.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  8. CONTRIBUTION LICENSE
                </h2>
                <p>
                  By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  9. SERVICES MANAGEMENT
                </h2>
                <p>
                  We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; (3) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  10. PRIVACY POLICY
                </h2>
                <p>
                  We care about data privacy and security. Please review our Privacy Policy:{' '}
                  <a href="https://relaycapture.com/privacy" className="underline hover:text-white">
                    https://relaycapture.com/privacy
                  </a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Egypt. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Egypt, then through your continued use of the Services, you are transferring your data to Egypt, and you expressly consent to have your data transferred to and processed in Egypt.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  11. TERM AND TERMINATION
                </h2>
                <p>
                  These Legal Terms shall remain in full force and effect while you use the Services. WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES, TO ANY PERSON FOR ANY REASON.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  12. MODIFICATIONS AND INTERRUPTIONS
                </h2>
                <p>
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  13. GOVERNING LAW
                </h2>
                <p>
                  These Legal Terms shall be governed by and defined following the laws of Egypt. Relay Capture and yourself irrevocably consent that the courts of Egypt shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  14. DISPUTE RESOLUTION
                </h2>
                <h3 className={`text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`}>
                  Informal Negotiations
                </h3>
                <p>
                  To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
                </p>
                <h3 className={`text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`}>
                  Binding Arbitration
                </h3>
                <p>
                  If the parties are unable to resolve the dispute through informal negotiation, the dispute shall be finally resolved by arbitration. The number of arbitrators shall be one (1). The seat, or legal place, or arbitration shall be Cairo, Egypt. The language of the proceedings shall be English. The governing law of these Legal Terms shall be substantive law of Egypt.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  15. CORRECTIONS
                </h2>
                <p>
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  16. DISCLAIMER
                </h2>
                <p>
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  17. LIMITATIONS OF LIABILITY
                </h2>
                <p>
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  18. INDEMNIFICATION
                </h2>
                <p>
                  You agree to defend, indemnify, and hold us harmless from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the Services.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  19. USER DATA
                </h2>
                <p>
                  We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services. You are solely responsible for all data that you transmit.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  20. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                </h2>
                <p>
                  Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  21. CALIFORNIA USERS AND RESIDENTS
                </h2>
                <p>
                  If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  22. MISCELLANEOUS
                </h2>
                <p>
                  These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  23. CONTACT US
                </h2>
                <p>
                  In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                </p>
                <div className="font-mono text-xs space-y-1 pl-2 border-l border-white/20">
                  <p>Relay Capture</p>
                  <p>
                    <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                      sam@relaycapture.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="pt-16 sm:pt-20">
          <FooterBottom
            isLightMode={isLightMode}
            onNavigateToTerms={onNavigateToTerms}
            onNavigateToPrivacy={onNavigateToPrivacy}
            onNavigateToRefunds={onNavigateToRefunds}
          />
        </div>
      </div>
    </div>
  );
}
