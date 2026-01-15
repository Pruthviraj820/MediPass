import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { auth, db } from '../../services/firebase'
import { colors } from '../../constants/colors'
import Navbar from '../../components/common/Navbar'
// final

const BLOOD_GROUPS = ['Unknown', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const Section = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
)

const InputRow = ({ children }) => (
    <View style={{ flexDirection: 'row', gap: 12 }}>{children}</View>
)

const AddBtn = ({ onPress }) => (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={{ color: 'white', fontWeight: '700' }}>Add</Text>
    </TouchableOpacity>
)

const Chip = ({ text, onRemove }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{text}</Text>
        <TouchableOpacity onPress={onRemove}>
            <Ionicons name="close-circle" size={22} color={colors?.error?.[500] || 'red'} />
        </TouchableOpacity>
    </View>
)

const TagSection = ({ title, value, setValue, list, setList }) => (
    <Section title={title}>
        <InputRow>
            <TextInput
                placeholder={`Add ${title}`}
                value={value}
                onChangeText={setValue}
                style={styles.input}
            />
            <AddBtn onPress={() => {
                if (!value.trim()) return

                setList(prev => [...prev, value.trim()])   // ✅ FIX
                setValue('')
            }} />
        </InputRow>

        {list.map((x, i) => (
            <Chip
                key={i}
                text={x}
                onRemove={() => {
                    setList(prev => prev.filter((_, k) => k !== i)) // ✅ FIX
                }}
            />
        ))}
    </Section>
)

const EditEmergencyProfile = ({ navigation }) => {
  const [bloodGroup, setBloodGroup] = useState('Unknown')
  const [allergies, setAllergies] = useState([])
  const [conditions, setConditions] = useState([])
  const [contacts, setContacts] = useState([])

  const [tempAllergy, setTempAllergy] = useState('')
  const [tempCondition, setTempCondition] = useState('')
  const [tempName, setTempName] = useState('')
  const [tempPhone, setTempPhone] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const user = auth?.currentUser
        if (!user || !db) {
          setLoading(false)
          return
        }

        const ref = doc(db, 'users', user.uid)
        const snap = await getDoc(ref)
        const d = snap.exists() ? snap.data() || {} : {}

        setBloodGroup(d.bloodGroup || 'Unknown')
        setAllergies(Array.isArray(d.allergies) ? d.allergies : [])
        setConditions(Array.isArray(d.medicalConditions) ? d.medicalConditions : [])
        setContacts(Array.isArray(d.emergencyContacts) ? d.emergencyContacts : [])
      } catch (error) {
        console.error('Failed to load emergency profile:', error)
        Alert.alert('Error', 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const save = async () => {
    try {
      const user = auth?.currentUser

      if (!user || !db) {
        console.log('❌ NO USER OR DB')
        Alert.alert('Error', 'User not logged in')
        return
      }

      const ref = doc(db, 'users', user.uid)

      const payload = {
        bloodGroup,
        allergies,
        medicalConditions: conditions,
        emergencyContacts: contacts,
        updatedAt: new Date().toISOString(),
      }

      console.log('📤 WRITING TO:', user.uid)
      console.log('📦 PAYLOAD:', payload)

      // Use merge to avoid overwriting core profile fields (name, email, role, etc.)
      await setDoc(ref, payload, { merge: true })

      console.log('✅ FIRESTORE UPDATED')
      Alert.alert('Saved', 'Emergency profile updated')
      navigation.goBack()
    } catch (e) {
      console.error('🔥 FIRESTORE SAVE ERROR:', e)
      Alert.alert('Save failed', e.message || 'Unknown error')
    }
  }


  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <>
    <Navbar />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emergency Medical Info</Text>

      {/* BLOOD GROUP */}
      <Section title="Blood Group">
        <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup}>
          {BLOOD_GROUPS.map((b) => (
            <Picker.Item key={b} label={b} value={b} />
          ))}
        </Picker>
      </Section>

      {/* CONTACTS */}
      <Section title="Emergency Contacts">
        <InputRow>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={tempName}
            onChangeText={setTempName}
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={tempPhone}
            onChangeText={setTempPhone}
          />
        </InputRow>

        {contacts.map((c, i) => (
          <Chip
            key={i}
            text={`${c.name} — ${c.phone}`}
            onRemove={() => {
              setContacts((prev) => prev.filter((_, x) => x !== i))
            }}
          />
        ))}

        <AddBtn
          onPress={() => {
            if (!tempName.trim() || !tempPhone.trim()) return

            setContacts((prev) => [
              ...prev,
              { name: tempName.trim(), phone: tempPhone.trim() },
            ])

            setTempName('')
            setTempPhone('')
          }}
        />

        
      </Section>

      {/* ALLERGIES */}
      <TagSection
        title="Allergies"
        value={tempAllergy}
        setValue={setTempAllergy}
        list={allergies}
        setList={setAllergies}
      />

      {/* CONDITIONS */}
      <TagSection
        title="Medical Conditions"
        value={tempCondition}
        setValue={setTempCondition}
        list={conditions}
        setList={setConditions}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Ionicons name="save" size={22} color="white" />
        <Text style={styles.saveText}>Save Emergency Profile</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  )
}

/* ---------------- SMALL UI PARTS ---------------- */




/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { padding: 24, backgroundColor: colors?.neutral?.[50] || '#FAFAFA' },
    title: { fontSize: 28, fontWeight: '800', marginBottom: 24 },
    section: { backgroundColor: 'white', padding: 20, borderRadius: 18, gap: 12, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700' },
    input: { flex: 1, backgroundColor: '#F4F4F5', padding: 14, borderRadius: 12 },
    addBtn: { backgroundColor: colors?.primary?.[600] || '#2563EB', padding: 12, borderRadius: 12, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
    chip: { backgroundColor: '#F4F4F5', padding: 14, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    chipText: { fontWeight: '600' },
    saveBtn: { backgroundColor: colors?.success?.[600] || 'green', padding: 18, borderRadius: 18, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
    saveText: { color: 'white', fontSize: 17, fontWeight: '800' }
})

export default EditEmergencyProfile
