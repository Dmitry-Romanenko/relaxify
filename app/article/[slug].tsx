import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function Article() {
  const { slug } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView>
        <View className="h-full w-full">
          <ImageBackground
            className="h-[400px] w-full"
            source={{
              uri: 'https://images.unsplash.com/photo-1546609970-c10babead09a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          >
            <View className="flex h-full w-full flex-col justify-between bg-[#00000048] px-5 py-4">
              <View>
                <FontAwesome name="close" size={25} color={'#e0e0e0'} />
              </View>
              <Text className="font-mbold text-2xl text-tx-primary">{slug}</Text>
            </View>
          </ImageBackground>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Meditation is a powerful practice that can bring numerous benefits to your mental and
            physical well-being. If you are new to meditation, starting with simple techniques can
            help you build a strong foundation. One of the most accessible and widely practiced
            forms of meditation is mindfulness meditation. It involves paying attention to your
            thoughts, feelings, and sensations in the present moment without judgment. To get
            started, find a quiet and comfortable place where you won’t be disturbed. Sit in a
            comfortable position with your back straight. You can sit on a chair, cushion, or the
            floor. Close your eyes and take a few deep breaths. Then, breathe naturally and focus on
            the sensation of your breath as it enters and leaves your nostrils. As you meditate,
            thoughts will come and go. Simply observe them without getting attached. Return your
            focus to your breath whenever your mind wanders. Start with just 5-10 minutes a day and
            gradually increase the duration as you become more comfortable with the practice.
          </Text>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Another useful technique is body scan meditation, which helps you develop a greater
            awareness of your bodily sensations and promotes relaxation. To practice body scan
            meditation, lie on your back with your arms at your sides and your legs slightly apart.
            Take a few deep breaths to center yourself. Starting from your toes, slowly move your
            attention up through your body. Notice any sensations, tension, or discomfort in each
            area. As you focus on each part of your body, try to release any tension and allow that
            area to relax. Continue this process until you reach the top of your head. Take a few
            moments to notice how your body feels as a whole.
          </Text>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Loving-kindness meditation, or Metta, involves cultivating feelings of compassion and
            love towards yourself and others. To practice loving-kindness meditation, sit or lie
            down in a comfortable position. Take a few deep breaths to settle into the practice.
            Silently repeat phrases like “May I be happy, may I be healthy, may I be safe, may I
            live with ease.” Feel the meaning of each phrase as you say it. After a few minutes,
            extend these wishes to others, starting with loved ones, then acquaintances, and
            finally, all beings everywhere. Allow yourself to feel the warmth and compassion growing
            within you as you repeat these phrases.
          </Text>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Guided meditation involves listening to a meditation teacher or guide who leads you
            through the practice. This can be particularly helpful for beginners. To make the most
            of guided meditation, find a guided meditation that resonates with you. There are many
            apps and online resources available. Dedicate a specific time each day for your guided
            meditation practice. Listen to the guide’s instructions and follow along as best as you
            can. Allow their words to guide your focus and relaxation. Regular practice is key to
            reaping the benefits of meditation. Try to practice at the same time each day.
          </Text>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Mantra meditation involves repeating a word or phrase (mantra) to help focus the mind.
            To get started with mantra meditation, select a word or phrase that feels meaningful to
            you. Common mantras include “Om,” “Peace,” or “Love.” Sit or lie down in a comfortable
            position. Take a few deep breaths to relax. Silently repeat your chosen mantra. Focus on
            the sound and vibration of the mantra as you repeat it. If your mind wanders, gently
            bring your focus back to the mantra.
          </Text>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            Starting a meditation practice can be a transformative journey towards greater peace and
            well-being. By exploring these beginner-friendly techniques, you can find a practice
            that resonates with you and fits into your daily routine. Remember, consistency is key,
            so try to set aside a few minutes each day for meditation. Over time, you’ll likely
            notice a positive impact on your mental clarity, emotional balance, and overall sense of
            calm.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
