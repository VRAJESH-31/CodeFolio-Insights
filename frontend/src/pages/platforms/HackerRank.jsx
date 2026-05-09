import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { BadgeCollection, CertificatesCollection } from '@/components/export.js';
import { StatCard, ProblemsCard } from '@/components/cards/export.js';
import { COLOR_MAP } from '@/constants/colors.js';

const HackerRank = () => {
  const { data } = useOutletContext();

  const platformData = data.hackerrank;
  const certificates = platformData?.profile?.certificates?.filter((cert) => cert.attributes.status === 'test_passed') || [];

  const totalProblems = platformData?.profile?.badges?.reduce((total, badge) => total + (badge.solved || 0), 0) || 0;

  const badges =
    platformData?.profile?.badges
      ?.filter((badge) => badge?.stars > 0)
      ?.map((badge) => ({
        isHackerrankBadge: true,
        stars: badge.stars || 0,
        name: badge.badge_name || 'NA',
        subTitle: null,
        subTitleIcon: null,
      })) || [];

  const platformProblemsData =
    platformData?.profile?.badges
      ?.filter((badge) => badge?.solved > 0)
      ?.sort((a, b) => b.solved - a.solved)
      ?.map((badge, index) => ({
        name: badge.badge_name,
        value: badge.solved || 0,
        color: COLOR_MAP[index % COLOR_MAP.length].gradient,
      })) || [];

  return (
    <div className="space-y-8 animate-float-in">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StatCard title="Total Problems" value={totalProblems} color="blue" index={0} />

        <StatCard title="Certificates" value={certificates.length} color="purple" index={1} />

        <ProblemsCard title="Solved Progress" problemsData={platformProblemsData} />

        <CertificatesCollection title="Earned Certificates" certificates={certificates} />

        <BadgeCollection title="Skill Badges" badges={badges} className="xl:col-span-2" />
      </div>
    </div>
  );
};

export default HackerRank;
