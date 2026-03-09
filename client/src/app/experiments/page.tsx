"use client";

import Header from "@/app/(components)/Header";
import { FileText, BookOpen, ArrowUpRight, FlaskConical } from "lucide-react";

export default function Experiments() {
  const classes = [
    {
      label: "Class 11",
      title: "Class 11 Experiments",
      subtitle: "Practical Index",
      href: "/experiments/class11/Class 11 Experiments.png",
      icon: <FileText size={22} />,
      accent: "#3b82f6",
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-100",
      badge: "bg-blue-100 text-blue-700",
      iconBg: "bg-blue-100 text-blue-600",
      linkColor: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Class 12",
      title: "Class 12 Experiments",
      subtitle: "Practical Index",
      href: "/experiments/class12/Class 12 Experiments.png",
      icon: <BookOpen size={22} />,
      accent: "#10b981",
      gradient: "from-emerald-50 to-teal-50",
      border: "border-emerald-100",
      badge: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-emerald-100 text-emerald-600",
      linkColor: "text-emerald-600 hover:text-emerald-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
            <FlaskConical size={22} />
          </div>
          <span className="text-sm font-semibold text-violet-500 tracking-widest uppercase">
            Laboratory
          </span>
        </div>
        <Header name="Chemistry Experiments" />
        <p className="text-slate-400 mt-1 text-sm">
          Access practical manuals and experiment indexes for each class.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.label}
            className={`relative bg-gradient-to-br ${cls.gradient} rounded-2xl border ${cls.border} p-6 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden`}
          >
            {/* Decorative circle */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: cls.accent }}
            />

            {/* Card Top */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${cls.badge}`}
                >
                  {cls.label}
                </span>
                <h2 className="text-xl font-bold text-slate-800 leading-tight">
                  {cls.title}
                </h2>
              </div>
              <div className={`p-3 rounded-xl ${cls.iconBg} flex-shrink-0`}>
                {cls.icon}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/60 mb-4" />

            {/* Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-slate-600 text-sm font-medium">
                  {cls.subtitle}
                </span>
              </div>
              <a
                href={cls.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-sm font-semibold ${cls.linkColor} transition-colors duration-200`}
              >
                View Manual
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}