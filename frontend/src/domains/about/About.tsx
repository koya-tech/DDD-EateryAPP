import { motion } from 'framer-motion';
import {
    MapPin,
    Share2,
    Search,
} from 'lucide-react';
import { Card, CardContent } from '../../shadcn/ui/card';

function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const features = [
        {
        icon: <MapPin className="w-12 h-12 text-primary" />,
        title: 'Location Information',
        description: 'Easily check the location of your favorite restaurants. Find them intuitively on the map.',
        },
        {
        icon: <Share2 className="w-12 h-12 text-primary" />,
        title: 'Share Favorites',
        description: 'Share your wonderful dining discoveries with loved ones. Create and share memorable places together.',
        },
        {
        icon: <Search className="w-12 h-12 text-primary" />,
        title: 'Restaurant Search',
        description: 'Find your ideal restaurant by area or cuisine type. Let us help you make new discoveries.',
        },
    ];

    return (
        <div className="flex border-t">
            <div className="hidden md:basis-1/2 md:block">
                <img
                    src="/forAuth.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
            </div>
            <div className="md:basis-1/2 items-center justify-center">
                <div className="min-h-screen bg-gradient-to-b from-background to-muted">
                {/* Hero Section */}
                    <motion.section
                        className="container mx-auto px-4 py-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                        className="text-4xl font-bold mb-6 mt-10"
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={fadeIn.transition}
                        >
                            Share Delicious Discoveries
                            <br />
                            With Your Loved Ones
                        </motion.h1>
                        <motion.p
                        className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto mt-2"
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={fadeIn.transition}
                        >
                            Find your favorite restaurants, share them with others,
                            and expand your circle of culinary experiences.
                        </motion.p>
                    </motion.section>

                    {/* Features Section */}
                    <section className="container mx-auto px-4 py-2">
                        <div className="grid grid-cols-1 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                            <Card className="h-full">
                                <CardContent className="pt-3">
                                <div className="flex flex-col items-center text-center p-3">
                                    {feature.icon}
                                    <h3 className="text-xl font-semibold mt-2 mb-1">
                                    {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                    {feature.description}
                                    </p>
                                </div>
                                </CardContent>
                            </Card>
                            </motion.div>
                        ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
