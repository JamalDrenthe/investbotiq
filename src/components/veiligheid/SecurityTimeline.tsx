import React from "react";
import { motion } from "framer-motion";
import { Lock, Shield, FileCheck, RefreshCw } from "lucide-react";
export default function SecurityTimeline() {
  return <div className="relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>
      
      <div className="space-y-12">
        <TimelineItem icon={<Lock className="w-6 h-6 text-indigo-600" />} iconBg="bg-indigo-100" title="Login beveiligd via Supabase" description="State-of-the-art beveiligingsmechanismen voor authenticatie en sessiemanagement." delay={0} reverse={false} />
        
        <TimelineItem icon={<Shield className="w-6 h-6 text-blue-600" />} iconBg="bg-blue-100" title="Toegangscontrole via policies" description="Row Level Security op alle tabellen zorgt ervoor dat gebruikers alleen toegang hebben tot hun eigen data." delay={0.1} reverse={true} />
        
        <TimelineItem icon={<FileCheck className="w-6 h-6 text-amber-600" />} iconBg="bg-amber-100" title="Trigger logging bij gevoelige acties" description="Automatische logging van alle wijzigingen in cashflow, taken en spirits voor volledige transparantie." delay={0.2} reverse={false} />
        
        <TimelineItem icon={<RefreshCw className="w-6 h-6 text-green-600" />} iconBg="bg-green-100" title="Maandelijkse auditcheck" description="Regelmatige controles op verdachte activiteit of ongebruikelijke patronen in het systeem." delay={0.3} reverse={true} />
      </div>
    </div>;
}
interface TimelineItemProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  delay: number;
  reverse: boolean;
}
function TimelineItem({
  icon,
  iconBg,
  title,
  description,
  delay,
  reverse
}: TimelineItemProps) {
  return <motion.div initial={{
    opacity: 0,
    x: reverse ? 50 : -50
  }} whileInView={{
    opacity: 1,
    x: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6
  }} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center gap-4 md:gap-8`}>
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center border-4 border-white z-10 relative`}>
          {icon}
        </div>
        <div className="ml-6 md:hidden">
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
      </div>
      
      <div className={`hidden md:block md:flex-1 ${reverse ? '' : 'md:text-right'}`}>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      
      <div className={`ml-16 md:ml-0 md:flex-1 ${reverse ? 'md:text-right' : ''}`}>
        <p className="text-gray-700">
          {description}
        </p>
      </div>
    </motion.div>;
}