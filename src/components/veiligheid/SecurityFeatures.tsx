import React from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Check, Eye } from "lucide-react";
export default function SecurityFeatures() {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5
    }} className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold">End-to-end encryptie</h3>
        </div>
        <p className="text-gray-700 ml-12">
          Alleen jij en de IQ Bot hebben toegang tot je gegevens. Alle data-uitwisseling is volledig versleuteld.
        </p>
      </motion.div>
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold">JWT + RLS
        </h3>
        </div>
        <p className="text-gray-700 ml-12">JWT-tokens zorgen voor beveiligde sessies.</p>
      </motion.div>
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }} className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">Rolgebaseerde policies</h3>
        </div>
        <p className="text-gray-700 ml-12">
          Geen toegang tot andermans data. Members hebben alleen toegang tot hun eigen gegevens, admins hebben beperkte toegang.
        </p>
      </motion.div>
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5,
      delay: 0.3
    }} className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Eye className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold">Auditlogging</h3>
        </div>
        <p className="text-gray-700 ml-12">
          Elke wijziging wordt gelogd, zodat er volledige transparantie is over wie wat heeft gedaan en wanneer.
        </p>
      </motion.div>
    </div>;
}