import { useTranslation } from 'react-i18next';
import { Paper, Title, Text, Stack, Center, Box, ThemeIcon, Flex } from '@mantine/core';
import { Building2 } from 'lucide-react';
import { CreateOrganizationForm } from './CreateOrganizationForm';

export function CreateOrganizationPage() {
  const { t } = useTranslation();

  return (
    <Flex
    h="100vh" 
    align="center"
    justify="center"
   
      p="xl"
    >
      <Box w="100%" maw="540px">
        <Paper
          radius="lg"
          p="xl"
          shadow="xl"
          bg="white"
          style={{
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack gap="lg">
            <Center>
              <ThemeIcon
                size={64}
                radius="xl"
                variant="gradient"
                gradient={{ from: 'brand', to: 'accent', deg: 135 }}
              >
                <Building2 size={32} />
              </ThemeIcon>
            </Center>

            <Stack gap="xs" align="center">
              <Title order={2} ta="center">
                {t('organization.create.title')}
              </Title>
              <Text c="dimmed" size="sm" ta="center">
                {t('organization.create.subtitle')}
              </Text>
            </Stack>

            <CreateOrganizationForm />
          </Stack>
        </Paper>
      </Box>
    </Flex>
  );
}

