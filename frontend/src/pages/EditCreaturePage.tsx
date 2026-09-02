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

import { useNavigate, useParams } from 'react-router-dom';

import {
  getMyCreatureById,
  updateCreature,
} from '../features/creatures/services/creatureService';

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

import type { Creature } from '../features/creatures/types/creature';

function creatureToFormValues(creature: Creature): CreatureFormValues {
  let threatLevel: CreatureFormValues['threatLevel'];

  switch (creature.threatLevel) {
    case 'Low':
      threatLevel = 'LOW';
      break;

    case 'Moderate':
      threatLevel = 'MODERATE';
      break;

    case 'High':
      threatLevel = 'HIGH';
      break;

    case 'Extreme':
      threatLevel = 'EXTREME';
      break;

    default:
      threatLevel = 'LOW';
  }

  return {
    name: creature.name,

    scientificName: creature.scientificName ?? '',

    description: creature.description,

    threatLevel,

    behavior: creature.ecology.behavior,

    lifeCycle: creature.ecology.lifeCycle,

    attackStyle: creature.combat.attackStyle,

    habitatIds: creature.ecology.habitatIds,

    dietIds: creature.ecology.dietIds,
    coverImageUrl: creature.gallery.coverImage?.url ?? '',

    galleryImages: creature.gallery.images.map((image) => ({
      url: image.url,
      alt: image.alt,
      caption: image.caption ?? '',
    })),
    affinities: creature.combat.affinities.map((affinity) => ({
      type: affinity.type === 'Weakness' ? 'WEAKNESS' : 'RESISTANCE',

      targetType:
        affinity.targetType === 'Element'
          ? 'ELEMENT'
          : affinity.targetType === 'DamageType'
            ? 'DAMAGE_TYPE'
            : 'BODY_PART',

      targetId: affinity.targetId,

      description: affinity.description ?? '',
    })),
  };
}

export function EditCreaturePage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [values, setValues] = useState<CreatureFormValues | null>(null);

  const [habitats, setHabitats] = useState<LibraryEntity[]>([]);

  const [diets, setDiets] = useState<LibraryEntity[]>([]);
  const [elements, setElements] = useState<LibraryEntity[]>([]);

  const [damageTypes, setDamageTypes] = useState<LibraryEntity[]>([]);

  const [bodyParts, setBodyParts] = useState<LibraryEntity[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      if (!id) {
        setError('Invalid creature id');
        setIsLoading(false);
        return;
      }

      try {
        setError(null);

        const [
          creature,
          habitatsData,
          dietsData,
          elementsData,
          damageTypesData,
          bodyPartsData,
        ] = await Promise.all([
          getMyCreatureById(id),
          getHabitats(),
          getDiets(),
          getElements(),
          getDamageTypes(),
          getBodyParts(),
        ]);

        if (!active) {
          return;
        }

        setValues(creatureToFormValues(creature));

        setHabitats(habitatsData);
        setDiets(dietsData);
        setElements(elementsData);
        setDamageTypes(damageTypesData);
        setBodyParts(bodyPartsData);
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error ? error.message : 'Unable to load creature',
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id || !values) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await updateCreature(id, {
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
        error instanceof Error ? error.message : 'Unable to update creature',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!values) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Alert severity="error">{error ?? 'Creature not found'}</Alert>

            <Box>
              <Button onClick={() => navigate('/my-creatures')}>
                Back to My Creatures
              </Button>
            </Box>
          </Stack>
        </Container>
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
              Edit Creature
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Update the creature information stored in your codex.
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
                  {isSubmitting ? 'Saving...' : 'Save changes'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
