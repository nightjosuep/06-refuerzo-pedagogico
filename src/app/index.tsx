/**
 * ============================================================================
 * 🥊 RETO 04 — Contenedor del Bar Salesiano (useState directo)
 * Módulo: Programación Móvil — 3° Bachillerato Técnico (UETS)
 * ============================================================================
 *
 * 📖 MISIÓN:
 * Conectar el dominio (Reto 01) con los componentes (Retos 02 y 03) usando
 * `useState` directamente en la pantalla. NADA de custom hooks todavía: eso
 * llega en la Semana 09.
 *
 * 🛠️ INSTRUCCIONES:
 *  1. Implementa `incrementar`, `decrementar` y `reiniciar` reutilizando
 *     `calcularValor` del dominio (no sumes a mano).
 *  2. Usa `estadoUI` para deshabilitar los botones en los límites.
 *  3. INTEGRADOR: agrega 2 contadores más (Empanadas y Jugos) repitiendo el
 *     estado.
 *  4. Ejecuta en tu terminal: `pnpm run start:04`
 */

import { BotonContador } from '@/components/BotonContador';
import { ContadorDisplay } from '@/components/ContadorDisplay';
import { calcularValor, estadoUI, type ContadorConfig } from '@/domain/counter';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  // 🔎 ¿Por qué el estado arranca en 0? ¿Qué cambiaría si empezara en otro valor?
  const [valor, setValor] = useState(0);
  const [empanadas, setEmpanadas] = useState(0);
  const [jugos, setJugos] = useState(0);

  // 🔎 ¿Qué representa cada campo? ¿Por qué `valor` viene del estado y el resto son fijos?
  const config: ContadorConfig = { valor, paso: 1, minimo: 0, maximo: 10 };
  const configEmpanadas: ContadorConfig = { valor: empanadas, paso: 1, minimo: 0, maximo: 10 };
  const configJugos: ContadorConfig = { valor: jugos, paso: 1, minimo: 0, maximo: 10 };

  // 🔎 ¿Por qué calculamos `estado` y no lo guardamos en otro useState?
  const estado = estadoUI(valor, config);
  const estadoEmpanadas = estadoUI(empanadas, configEmpanadas);
  const estadoJugos = estadoUI(jugos, configJugos);

  // 👉 Antes de implementar, revisa el TSDoc de `calcularValor` (src/domain/counter.ts):
  //    ahí está el contrato; tú escribes el cómo.
  const incrementar = () => {
    setValor(calcularValor(config, 'incrementar'));
  };
  const decrementar = () => {
    setValor(calcularValor(config, 'decrementar'));
  };
  const reiniciar = () => {
    setValor(0);
  };

  const incrementarEmpanadas = () => {
    setEmpanadas(calcularValor(configEmpanadas, 'incrementar'));
  };
  const decrementarEmpanadas = () => {
    setEmpanadas(calcularValor(configEmpanadas, 'decrementar'));
  };
  const reiniciarEmpanadas = () => {
    setEmpanadas(0);
  };

  const incrementarJugos = () => {
    setJugos(calcularValor(configJugos, 'incrementar'));
  };
  const decrementarJugos = () => {
    setJugos(calcularValor(configJugos, 'decrementar'));
  };
  const reiniciarJugos = () => {
    setJugos(0);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bar Salesiano · Contadores</Text>

        <View style={styles.counter}>
          <ContadorDisplay valor={valor} etiqueta="Sanduches" />
          <View style={styles.actions}>
            <BotonContador label="+1" onPress={incrementar} variante="primary" disabled={estado === 'MAXIMO'} />
            <BotonContador label="-1" onPress={decrementar} variante="secondary" disabled={estado === 'MINIMO'} />
            <BotonContador label="Reiniciar" onPress={reiniciar} variante="danger" />
          </View>
        </View>

        <View style={styles.counter}>
          <ContadorDisplay valor={empanadas} etiqueta="Empanadas" />
          <View style={styles.actions}>
            <BotonContador label="+1" onPress={incrementarEmpanadas} variante="primary" disabled={estadoEmpanadas === 'MAXIMO'} />
            <BotonContador label="-1" onPress={decrementarEmpanadas} variante="secondary" disabled={estadoEmpanadas === 'MINIMO'} />
            <BotonContador label="Reiniciar" onPress={reiniciarEmpanadas} variante="danger" />
          </View>
        </View>

        <View style={styles.counter}>
          <ContadorDisplay valor={jugos} etiqueta="Jugos" />
          <View style={styles.actions}>
            <BotonContador label="+1" onPress={incrementarJugos} variante="primary" disabled={estadoJugos === 'MAXIMO'} />
            <BotonContador label="-1" onPress={decrementarJugos} variante="secondary" disabled={estadoJugos === 'MINIMO'} />
            <BotonContador label="Reiniciar" onPress={reiniciarJugos} variante="danger" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EFE6D6',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  counter: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#0A0A0A',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
});
