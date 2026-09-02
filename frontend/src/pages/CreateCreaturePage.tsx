import { useEffect, useState, type FormEvent } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { createCreature } from '../features/creatures/services/creatureService';

import {
  getBodyParts,
  getDamageTypes,
  getDiets,
  getElements,
  getHabitats,
  type LibraryEntity,
} from '../features/library/services/libraryService';

import {
  CreatureForm,
  type CreatureFormValues,
} from '../features/creatures/components/CreatureForm';

const initialValues: CreatureFormValues = {
  name: '',
  scientificName: '',
  description: '',
  threatLevel: 'LOW',

  behavior: '',
  lifeCycle: '',
  attackStyle: '',

  habitatIds: [],
  dietIds: [],

  affinities: [],

  coverImageUrl: '',

  galleryImages: [],
};

export function CreateCreaturePage() {
  const navigate = useNavigate();

  const [values, setValues] = useState<CreatureFormValues>(initialValues);

  const [habitats, setHabitats] = useState<LibraryEntity[]>([]);

  const [diets, setDiets] = useState<LibraryEntity[]>([]);
  const [elements, setElements] = useState<LibraryEntity[]>([]);
  const [damageTypes, setDamageTypes] = useState<LibraryEntity[]>([]);
  const [bodyParts, setBodyParts] = useState<LibraryEntity[]>([]);

  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadOptions() {
      try {
        setError(null);

        const [
          habitatsData,
          dietsData,
          elementsData,
          damageTypesData,
          bodyPartsData,
        ] = await Promise.all([
          getHabitats(),
          getDiets(),
          getElements(),
          getDamageTypes(),
          getBodyParts(),
        ]);

        if (!active) {
          return;
        }

        setHabitats(habitatsData);
        setDiets(dietsData);
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Unable to load creature options',
        );
      } finally {
        if (active) {
          setIsLoadingOptions(false);
        }
      }
    }

    loadOptions();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await createCreature({
        name: values.name.trim(),
        scientificName: values.scientificName.trim() || null,
        description: values.description.trim(),
        threatLevel: values.threatLevel,

        behavior: values.behavior.trim() || null,

        lifeCycle: values.lifeCycle.trim() || null,

        attackStyle: values.attackStyle.trim() || null,

        habitatIds: values.habitatIds,
        dietIds: values.dietIds,

        affinities: values.affinities.map((affinity) => ({
          type: affinity.type,
          targetType: affinity.targetType,
          targetId: affinity.targetId,
          description: affinity.description.trim() || null,
        })),

        coverImageUrl: values.coverImageUrl.trim() || null,
        galleryImages: values.galleryImages
          .filter((image) => image.url.trim())
          .map((image) => ({
            url: image.url.trim(),

            alt: image.alt.trim() || values.name.trim(),

            caption: image.caption.trim() || null,
          })),
      });

      navigate('/my-creatures', {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to create creature',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingOptions) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box>
            <Typography variant="overline" color="primary">
              CREATURE CODEX
            </Typography>

            <Typography variant="h2" component="h1">
              Create Creature
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Add a new creature to your codex. New creatures are created as
              drafts.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <CreatureForm
                values={values}
                habitats={habitats}
                diets={diets}
                elements={elements}
                damageTypes={damageTypes}
                bodyParts={bodyParts}
                onChange={setValues}
              />

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
                sx={{ justifyContent: 'flex-end' }}
              >
                <Button
                  type="button"
                  variant="text"
                  disabled={isSubmitting}
                  onClick={() => navigate('/my-creatures')}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={
                    isSubmitting ||
                    !values.name.trim() ||
                    !values.description.trim()
                  }
                >
                  {isSubmitting ? 'Creating...' : 'Create creature'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
