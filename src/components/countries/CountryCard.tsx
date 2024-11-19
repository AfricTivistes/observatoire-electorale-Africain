import React from 'react';
import { FaUsers, FaVoteYea, FaBalanceScale, FaChartBar } from 'react-icons/fa';

interface CountryCardProps {
  country: {
    code: string;
    name: string;
    population: number;
    lastElection: {
      type: string;
      year: number;
      turnout: number;
      nextElectionYear: number;
    };
    politicalSystem: string;
    demographics?: {
      voterRegistration?: {
        registered: number;
        eligible: number;
      };
    };
  };
}

const formatNumber = (num: number) => 
  new Intl.NumberFormat('fr-FR').format(num);

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const flagUrl = `https://flagcdn.com/w160/${country.code.toLowerCase()}.png`;
  const registrationRate = country.demographics?.voterRegistration ? 
    ((country.demographics.voterRegistration.registered / 
      country.demographics.voterRegistration.eligible) * 100).toFixed(1) : 
    null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-32 bg-gray-100">
        <img
          src={flagUrl}
          alt={`Drapeau ${country.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
          {country.name}
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <FaUsers className="text-africa-accent mt-1" />
            <div>
              <span className="text-sm text-gray-600">Population</span>
              <p className="font-semibold">{formatNumber(country.population)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaBalanceScale className="text-africa-accent mt-1" />
            <div>
              <span className="text-sm text-gray-600">Système</span>
              <p className="font-semibold">{country.politicalSystem}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaVoteYea className="text-africa-accent mt-1" />
            <div>
              <span className="text-sm text-gray-600">Dernière Élection</span>
              <p className="font-semibold">
                {country.lastElection.type} ({country.lastElection.year})
              </p>
              <p className="text-sm text-gray-600">
                Participation: {country.lastElection.turnout}%
              </p>
            </div>
          </div>

          {country.demographics?.voterRegistration && (
            <div className="flex items-start space-x-3">
              <FaChartBar className="text-africa-accent mt-1" />
              <div>
                <span className="text-sm text-gray-600">Inscription Électorale</span>
                <p className="font-semibold">
                  {formatNumber(country.demographics.voterRegistration.registered)}
                </p>
                {registrationRate && (
                  <p className="text-sm text-gray-600">
                    Taux: {registrationRate}%
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <a 
            href={`/countries/${country.code.toLowerCase()}`}
            className="px-4 py-2 bg-africa-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Détails
          </a>
          <a 
            href={`/elections?country=${country.code.toLowerCase()}`}
            className="px-4 py-2 bg-africa-warm text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Élections
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;