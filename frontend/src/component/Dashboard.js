import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0e141b]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path data */}
          </svg>
        </div>
        <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">
          Shadow Chat
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {["Home", "Features", "Pricing", "Resources"].map((link) => (
            <a
              key={link}
              className="text-[#0e141b] text-sm font-medium leading-normal"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2884e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Sign up</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Log in</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/be99fce0-7be2-436e-ac7b-5372d65f72cd.png")',
              }}
            >
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  About Shadow Chat
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Shadow Chat is a secure and private messaging app for your
                  team, friends, and family. We are on a mission to build a
                  communication platform that respects your privacy and gives
                  you control over your data.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoreFeatures = () => {
  const features = [
    {
      title: "End-to-End Encryption",
      description:
        "Messages are encrypted on your device and can only be read by the recipient.",
      image:
        "https://cdn.usegalileo.ai/stability/785699f8-73b5-4770-9a69-d00aec5ed09f.png",
    },
    {
      title: "Self-Destructing Messages",
      description:
        "Set a timer for messages to disappear after they are read.",
      image:
        "https://cdn.usegalileo.ai/sdxl10/0a836ce6-b05f-41b3-b885-bd65d0ba35cf.png",
    },
    {
      title: "Incognito Mode",
      description:
        "Send messages without saving chat history or contacts.",
      image:
        "https://cdn.usegalileo.ai/sdxl10/9cd7e326-9040-43dc-9d98-180be5450e49.png",
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col gap-3 pb-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{
              backgroundImage: `url("${feature.image}")`,
            }}
          ></div>
          <div>
            <p className="text-[#0e141b] text-base font-medium leading-normal">
              {feature.title}
            </p>
            <p className="text-[#4e7297] text-sm font-normal leading-normal">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <HeroSection />
        <CoreFeatures />
      </div>
    </div>
  );
};

export default Dashboard;
