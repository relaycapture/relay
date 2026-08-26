'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface PrivacyPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function PrivacyPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: PrivacyPageProps) {
  return (
    <div
      id="privacy-page"
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
              Privacy Policy
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
            {/* Preamble */}
            <div className="space-y-4">
              <p className="leading-relaxed">
                This Privacy Notice for Relay Capture (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and why we might access, collect, store, use, and/or share (&quot;process&quot;) your personal information when you use our services (&quot;Services&quot;), including when you:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Visit our website at <a href="https://relaycapture.com" className="text-blue-500 hover:underline">relaycapture.com</a> or any website of ours that links to this Privacy Notice</li>
                <li>Engage with us in other related ways, including any marketing or events</li>
              </ul>
              <p className="leading-relaxed">
                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
            </div>

            {/* SUMMARY OF KEY POINTS */}
            <div className={`p-6 rounded-2xl border space-y-3 ${isLightMode ? 'bg-black/[0.02] border-black/10' : 'bg-white/[0.02] border-white/10'}`}>
              <h2 className={`text-base sm:text-lg font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                SUMMARY OF KEY POINTS
              </h2>
              <p className="leading-relaxed text-xs sm:text-sm">
                This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
                <li><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</li>
                <li><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</li>
                <li><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process your information only when we have a valid legal reason to do so.</li>
                <li><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</li>
                <li><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</li>
                <li><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</li>
                <li><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by contacting us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>. We will consider and act upon any request in accordance with applicable data protection laws.</li>
              </ul>
            </div>

            {/* TABLE OF CONTENTS */}
            <div className={`p-6 rounded-2xl border ${isLightMode ? 'bg-black/[0.02] border-black/10' : 'bg-white/[0.02] border-white/10'}`}>
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider mb-4 ${isLightMode ? 'text-black' : 'text-white'}`}>
                TABLE OF CONTENTS
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
                <li>1. WHAT INFORMATION DO WE COLLECT?</li>
                <li>2. HOW DO WE PROCESS YOUR INFORMATION?</li>
                <li>3. WHAT LEGAL BASES DO WE RELY ON?</li>
                <li>4. WHEN AND WITH WHOM DO WE SHARE INFO?</li>
                <li>5. HOW LONG DO WE KEEP YOUR INFORMATION?</li>
                <li>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
                <li>7. DO WE COLLECT INFORMATION FROM MINORS?</li>
                <li>8. WHAT ARE YOUR PRIVACY RIGHTS?</li>
                <li>9. CONTROLS FOR DO-NOT-TRACK FEATURES</li>
                <li>10. UNITED STATES SPECIFIC PRIVACY RIGHTS</li>
                <li>11. OTHER REGIONS SPECIFIC PRIVACY RIGHTS</li>
                <li>12. DO WE MAKE UPDATES TO THIS NOTICE?</li>
                <li>13. HOW CAN YOU CONTACT US?</li>
                <li>14. REVIEW, UPDATE, OR DELETE DATA</li>
              </ol>
            </div>

            {/* 1. WHAT INFORMATION DO WE COLLECT? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                1. WHAT INFORMATION DO WE COLLECT?
              </h2>
              <h3 className="font-semibold text-sm sm:text-base">Personal information you disclose to us</h3>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We collect personal information that you provide to us.</p>
              <p className="leading-relaxed">
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <p className="leading-relaxed">
                <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>names</li>
                <li>email addresses</li>
                <li>debit/credit card numbers</li>
              </ul>
              <p className="leading-relaxed">
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </p>
              <p className="leading-relaxed">
                <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Paddle. You may find their privacy notice link(s) here: <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">https://www.paddle.com/legal/privacy</a>.
              </p>
              <p className="leading-relaxed">
                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
              </p>
            </div>

            {/* 2. HOW DO WE PROCESS YOUR INFORMATION? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                2. HOW DO WE PROCESS YOUR INFORMATION?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
              <p className="leading-relaxed">
                We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>To save or protect an individual&apos;s vital interest. We may process your information when necessary to save or protect an individual&apos;s vital interest, such as to prevent harm.</li>
              </ul>
            </div>

            {/* 3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.</p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">If you are located in the EU or UK, this section applies to you.</h3>
              <p className="leading-relaxed">
                The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
                <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.</li>
              </ul>
              <h3 className="font-semibold text-sm sm:text-base pt-2">If you are located in Canada, this section applies to you.</h3>
              <p className="leading-relaxed">
                We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
              </p>
              <p className="leading-relaxed">
                In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                <li>For investigations and fraud detection and prevention</li>
                <li>For business transactions provided certain conditions are met</li>
                <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                <li>If it was produced by an individual in the course of their employment, business, or profession</li>
                <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                <li>If the information is publicly available and is specified by the regulations</li>
                <li>We may disclose de-identified information for approved research or statistics projects.</li>
              </ul>
            </div>

            {/* 4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We may share information in specific situations described in this section and/or with specific third parties.</p>
              <p className="leading-relaxed">
                We may need to share your personal information in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
            </div>

            {/* 5. HOW LONG DO WE KEEP YOUR INFORMATION? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                5. HOW LONG DO WE KEEP YOUR INFORMATION?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
              <p className="leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than 30 days.
              </p>
              <p className="leading-relaxed">
                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible, then we will securely store your personal information and isolate it from any further processing until deletion is possible.
              </p>
            </div>

            {/* 6. HOW DO WE KEEP YOUR INFORMATION SAFE? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                6. HOW DO WE KEEP YOUR INFORMATION SAFE?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We aim to protect your personal information through a system of organizational and technical security measures.</p>
              <p className="leading-relaxed">
                We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
              </p>
            </div>

            {/* 7. DO WE COLLECT INFORMATION FROM MINORS? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                7. DO WE COLLECT INFORMATION FROM MINORS?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: We do not knowingly collect data from or market to children under 18 years of age.</p>
              <p className="leading-relaxed">
                We do not knowingly collect, solicit data from, or market to children under 18 years of age. By using the Services, you represent that you are at least 18. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
            </div>

            {/* 8. WHAT ARE YOUR PRIVACY RIGHTS? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                8. WHAT ARE YOUR PRIVACY RIGHTS?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.</p>
              <p className="leading-relaxed">
                In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.
              </p>
              <p className="leading-relaxed">
                We will consider and act upon any request in accordance with applicable data protection laws.
              </p>
              <p className="leading-relaxed">
                If you are located in the UK and are unhappy with how we have handled your personal information, you can make a complaint directly to us.
              </p>
              <p className="leading-relaxed">
                <strong>How to contact us:</strong><br />
                • Online: <a href="https://relaycapture.com" className="text-blue-500 hover:underline">relaycapture.com</a><br />
                • Email: <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>
              </p>
              <p className="leading-relaxed">
                <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time.
              </p>
            </div>

            {/* 9. CONTROLS FOR DO-NOT-TRACK FEATURES */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                9. CONTROLS FOR DO-NOT-TRACK FEATURES
              </h2>
              <p className="leading-relaxed">
                Most web browsers and some mobile operating systems include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals.
              </p>
              <p className="leading-relaxed">
                <strong>Global Privacy Control:</strong> We recognize and honor Global Privacy Control (GPC) signals. If you use a browser or extension that supports GPC, we will treat this as a valid request to opt out of the sale or sharing of your personal information.
              </p>
            </div>

            {/* 10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have specific rights regarding your personal information.</p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">Categories of Personal Information We Collect</h3>
              <p className="leading-relaxed">
                We collect Identifiers (Contact details, such as real name, email address). We do not collect Protected classification characteristics, Commercial information, Biometric information, Geolocation data, Audio/Visual information, or Sensitive personal information.
              </p>
              <p className="leading-relaxed">
                We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
              </p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">Your Rights</h3>
              <p className="leading-relaxed">
                You have rights under certain US state data protection laws. These rights include:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Right to know whether or not we are processing your personal data</li>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccuracies in your personal data</li>
                <li>Right to request the deletion of your personal data</li>
                <li>Right to obtain a copy of the personal data you previously shared with us</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>
              <p className="leading-relaxed">
                To exercise these rights, you can contact us by emailing us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">California &quot;Shine The Light&quot; Law</h3>
              <p className="leading-relaxed">
                California Civil Code Section 1798.83 permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes.
              </p>
            </div>

            {/* 11. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                11. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
              </h2>
              <h3 className="font-semibold text-sm sm:text-base">Australia and New Zealand</h3>
              <p className="leading-relaxed">
                We collect and process your personal information under the obligations and conditions set by Australia&apos;s Privacy Act 1988 and New Zealand&apos;s Privacy Act 2020. At any time, you have the right to request access to or correction of your personal information.
              </p>
              <h3 className="font-semibold text-sm sm:text-base pt-2">Republic of South Africa</h3>
              <p className="leading-relaxed">
                At any time, you have the right to request access to or correction of your personal information. If you are unsatisfied with the manner in which we address any complaint, you can contact the Information Regulator (South Africa) at <a href="mailto:enquiries@inforegulator.org.za" className="text-blue-500 hover:underline">enquiries@inforegulator.org.za</a>.
              </p>
            </div>

            {/* 12. DO WE MAKE UPDATES TO THIS NOTICE? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                12. DO WE MAKE UPDATES TO THIS NOTICE?
              </h2>
              <p className="italic text-neutral-500 text-xs sm:text-sm">In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
              <p className="leading-relaxed">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice.
              </p>
            </div>

            {/* 13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE? */}
            <div className="space-y-3">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </h2>
              <p className="leading-relaxed">
                If you have questions or comments about this notice, you may email us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
            </div>

            {/* 14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU? */}
            <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
              </h2>
              <p className="leading-relaxed">
                Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please contact us at <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>.
              </p>
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
