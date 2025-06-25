import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const ProgramCard = ({ program }: { program: any }) => {
  const {
    title,
    subtitle,
    icon: Icon,
    gradient,
    hoverGradient,
    badges,
    price,
    registrationFee,
    description,
    features,
    details,
    specialNote,
    challenges,
    challengesTitle,
    challengesDescription,
    offerings,
    buttonText,
  } = program;

  return (
    <Card className="overflow-hidden shadow-xl border-0 mb-16">
      <CardHeader className={`bg-gradient-to-r ${gradient} text-white p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            <CardDescription className="text-white/80 text-lg">
              {subtitle}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {program.id === "after-school-care"
                ? "Why Choose Fun4KidZ After School Care?"
                : program.id === "lego-robotics"
                ? "Program Overview"
                : "Program Benefits"}
            </h3>
            {description && <p className="text-gray-600 mb-6">{description}</p>}
            {program.id === "lego-robotics" && (
              <h4 className="text-xl font-semibold mb-3 text-gray-800">
                Learning Goals
              </h4>
            )}
            <div className="space-y-4 text-gray-600">
              {features.map((feature: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon
                    className={`h-5 w-5 mt-1 flex-shrink-0 ${
                      program.id === "after-school-care"
                        ? "text-orange-500"
                        : program.id === "lego-robotics"
                        ? "text-green-500"
                        : "text-purple-500"
                    }`}
                  />
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {program.id === "after-school-care"
                ? "Program Details - 25/26 School Year"
                : program.id === "lego-robotics"
                ? challengesTitle
                : "What We Offer"}
            </h3>

            {/* After School Care Details */}
            {details && (
              <div className="space-y-4">
                {details.map((detail: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <detail.icon className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold">{detail.title}</span>
                    </div>
                    {detail.items.length > 1 ? (
                      <ul className="text-gray-600 ml-7 space-y-1">
                        {detail.items.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 ml-7">{detail.items[0]}</p>
                    )}
                  </div>
                ))}
                {price && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {price}
                      </p>
                      <p className="text-sm text-green-700">
                        Drafted the Friday before your student attends
                      </p>
                      {registrationFee && (
                        <p className="text-lg font-semibold text-green-800 mt-2">
                          {registrationFee}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {specialNote && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <specialNote.icon className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-blue-800">
                        {specialNote.title}
                      </span>
                    </div>
                    <p className="text-blue-700 ml-7">{specialNote.text}</p>
                  </div>
                )}
              </div>
            )}

            {/* Lego Robotics Challenges */}
            {challenges && (
              <>
                <p className="text-gray-600 mb-4">{challengesDescription}</p>
                <div className="space-y-3">
                  {challenges.map((challenge: any, index: number) => (
                    <div
                      key={index}
                      className={`${challenge.bgColor} p-4 rounded-lg border ${challenge.borderColor}`}
                    >
                      <h4 className={`font-semibold ${challenge.textColor}`}>
                        {challenge.emoji} {challenge.title}
                      </h4>
                      <p className={`${challenge.descColor} text-sm`}>
                        {challenge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Homeschool Offerings */}
            {offerings && (
              <div className="space-y-4">
                {offerings.map((offering: any, index: number) => (
                  <div
                    key={index}
                    className={`${offering.bgColor} p-4 rounded-lg border ${offering.borderColor}`}
                  >
                    <h4 className={`font-semibold ${offering.textColor} mb-2`}>
                      {offering.emoji} {offering.title}
                    </h4>
                    <p className={`${offering.descColor} text-sm`}>
                      {offering.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/register">
            <Button
              size="lg"
              className={`bg-gradient-to-r ${gradient} hover:${hoverGradient} text-lg px-8 py-3`}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;