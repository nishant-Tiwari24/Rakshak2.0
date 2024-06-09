import streamlit as st 
import pickle 
import os
from streamlit_option_menu import option_menu

st.set_page_config(page_title="Multiple Disease Prediction", layout="wide", page_icon="👨‍🦰🤶")

working_dir = os.path.dirname(os.path.abspath(__file__))

diabetes_model = pickle.load(open(f'{working_dir}/saved_models/diabetes.pkl', 'rb'))
heart_disease_model = pickle.load(open(f'{working_dir}/saved_models/heart.pkl', 'rb'))
kidney_disease_model = pickle.load(open(f'{working_dir}/saved_models/kidney.pkl', 'rb'))

NewBMI_Overweight = 0
NewBMI_Underweight = 0
NewBMI_Obesity_1 = 0
NewBMI_Obesity_2 = 0 
NewBMI_Obesity_3 = 0
NewInsulinScore_Normal = 0 
NewGlucose_Low = 0
NewGlucose_Normal = 0 
NewGlucose_Overweight = 0
NewGlucose_Secret = 0

with st.sidebar:
    selected = option_menu("Multiple Disease Prediction", 
                ['Diabetes Prediction',
                 'Heart Disease Prediction',
                 'Kidney Disease Prediction'],
                 menu_icon='hospital-fill',
                 icons=['activity','heart', 'person'],
                 default_index=0)

if selected == 'Diabetes Prediction':
    st.title("Diabetes Prediction Using Machine Learning")

    col1, col2, col3 = st.columns(3)

    with col1:
        Pregnancies = st.text_input("Number of Pregnancies")
    with col2:
        Glucose = st.text_input("Glucose Level")
    with col3:
        BloodPressure = st.text_input("BloodPressure Value")
    with col1:
        SkinThickness = st.text_input("SkinThickness Value")
    with col2:
        Insulin = st.text_input("Insulin Value")
    with col3:
        BMI = st.text_input("BMI Value")
    with col1:
        DiabetesPedigreeFunction = st.text_input("DiabetesPedigreeFunction Value")
    with col2:
        Age = st.text_input("Age")

    diabetes_result = ""
    detailed_info = ""

    if st.button("Diabetes Test Result"):
        if float(BMI) <= 18.5:
            NewBMI_Underweight = 1
        elif 18.5 < float(BMI) <= 24.9:
            pass
        elif 24.9 < float(BMI) <= 29.9:
            NewBMI_Overweight = 1
        elif 29.9 < float(BMI) <= 34.9:
            NewBMI_Obesity_1 = 1
        elif 34.9 < float(BMI) <= 39.9:
            NewBMI_Obesity_2 = 1
        elif float(BMI) > 39.9:
            NewBMI_Obesity_3 = 1
        
        if 16 <= float(Insulin) <= 166:
            NewInsulinScore_Normal = 1

        if float(Glucose) <= 70:
            NewGlucose_Low = 1
        elif 70 < float(Glucose) <= 99:
            NewGlucose_Normal = 1
        elif 99 < float(Glucose) <= 126:
            NewGlucose_Overweight = 1
        elif float(Glucose) > 126:
            NewGlucose_Secret = 1

        user_input = [
            Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
            BMI, DiabetesPedigreeFunction, Age, NewBMI_Underweight,
            NewBMI_Overweight, NewBMI_Obesity_1,
            NewBMI_Obesity_2, NewBMI_Obesity_3, NewInsulinScore_Normal, 
            NewGlucose_Low, NewGlucose_Normal, NewGlucose_Overweight,
            NewGlucose_Secret
        ]
        
        user_input = [float(x) for x in user_input]
        prediction = diabetes_model.predict([user_input])
        if prediction[0] == 1:
            diabetes_result = "The person has diabetes."
            detailed_info = """
            **Diabetes Overview:**
            Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. 
            Most of the food you eat is broken down into sugar (also called glucose) and released into your bloodstream. 
            When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let 
            the blood sugar into your body’s cells for use as energy.

            **Management and Treatment:**
            1. **Healthy Eating:** Choose healthy foods and maintain a healthy weight.
            2. **Physical Activity:** Stay physically active to help control blood sugar levels.
            3. **Medication:** Follow your doctor’s prescription to manage blood sugar levels.
            4. **Monitoring Blood Sugar:** Regularly monitor your blood sugar levels to keep them in check.
            """
        else:
            diabetes_result = "The person does not have diabetes."

    st.success(diabetes_result)
    if detailed_info:
        st.markdown(detailed_info)

if selected == 'Heart Disease Prediction':
    st.title("Heart Disease Prediction Using Machine Learning")

    col1, col2, col3 = st.columns(3)

    with col1:
        age = st.text_input("Age")
    with col2:
        sex = st.text_input("Sex")
    with col3:
        cp = st.text_input("Chest Pain Types")
    with col1:
        trestbps = st.text_input("Resting Blood Pressure")
    with col2:
        chol = st.text_input("Serum Cholesterol in mg/dl")
    with col3:
        fbs = st.text_input('Fasting Blood Sugar > 120 mg/dl')
    with col1:
        restecg = st.text_input('Resting Electrocardiographic results')
    with col2:
        thalach = st.text_input('Maximum Heart Rate achieved')
    with col3:
        exang = st.text_input('Exercise Induced Angina')
    with col1:
        oldpeak = st.text_input('ST depression induced by exercise')
    with col2:
        slope = st.text_input('Slope of the peak exercise ST segment')
    with col3:
        ca = st.text_input('Major vessels colored by fluoroscopy')
    with col1:
        thal = st.text_input('Thal: 0 = normal; 1 = fixed defect; 2 = reversible defect')

    heart_disease_result = ""
    detailed_info = ""

    if st.button("Heart Disease Test Result"):
        user_input = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]
        user_input = [float(x) for x in user_input]
        prediction = heart_disease_model.predict([user_input])
        if prediction[0] == 1:
            heart_disease_result = "This person has heart disease."
            detailed_info = """
            **Heart Disease Overview:**
            Heart disease encompasses a range of conditions that affect the heart, including coronary artery disease, which involves the narrowing or blockage of the coronary arteries; arrhythmias, which are irregular heartbeats; and congenital heart defects, which are structural problems present at birth. Other conditions under the heart disease umbrella include cardiomyopathy, which weakens the heart muscle, and heart valve problems that affect the flow of blood through the heart. Managing heart disease effectively requires a multifaceted approach. Lifestyle changes are paramount; adopting a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins, and low in saturated fats, cholesterol, and sodium can significantly reduce risk factors. Regular physical activity, such as brisk walking, swimming, or cycling, helps maintain a healthy weight, lowers blood pressure, and strengthens the heart muscle. Quitting smoking is crucial, as tobacco use is a major risk factor for developing heart disease. Medications play a vital role in managing heart disease by controlling blood pressure, lowering cholesterol levels, preventing blood clots, and addressing other related conditions. Commonly prescribed medications include statins, beta-blockers, ACE inhibitors, and anticoagulants. In more severe cases, medical procedures or surgeries may be required. These can range from angioplasty and stent placement, which open blocked arteries, to more invasive procedures like coronary artery bypass grafting (CABG) and heart valve repair or replacement. Additionally, implantable devices such as pacemakers and defibrillators may be used to manage arrhythmias. Continuous monitoring and regular check-ups with a healthcare provider are essential for managing heart disease. This includes routine screenings for blood pressure, cholesterol levels, and diabetes, as well as periodic imaging tests like echocardiograms and stress tests to assess heart function. Effective communication with healthcare providers, adherence to prescribed treatments, and a proactive approach to managing risk factors are critical in preventing the progression of heart disease and improving overall heart health.
            """
            st.image('heart disease.png');
        else:
            heart_disease_result = "This person does not have heart disease."

    st.success(heart_disease_result)
    if detailed_info:
        st.markdown(detailed_info)

if selected == 'Kidney Disease Prediction':
    st.title("Kidney Disease Prediction Using Machine Learning")

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        age = st.text_input('Age')
    with col2:
        blood_pressure = st.text_input('Blood Pressure')
    with col3:
        specific_gravity = st.text_input('Specific Gravity')
    with col4:
        albumin = st.text_input('Albumin')
    with col5:
        sugar = st.text_input('Sugar')
    with col1:
        red_blood_cells = st.text_input('Red Blood Cell')
    with col2:
        pus_cell = st.text_input('Pus Cell')
    with col3:
        pus_cell_clumps = st.text_input('Pus Cell Clumps')
    with col4:
        bacteria = st.text_input('Bacteria')
    with col5:
        blood_glucose_random = st.text_input('Blood Glucose Random')
    with col1:
        blood_urea = st.text_input('Blood Urea')
    with col2:
        serum_creatinine = st.text_input('Serum Creatinine')
    with col3:
        sodium = st.text_input('Sodium')
    with col4:
        potassium = st.text_input('Potassium')
    with col5:
        haemoglobin = st.text_input('Haemoglobin')
    with col1:
        packed_cell_volume = st.text_input('Packed Cell Volume')
    with col2:
        white_blood_cell_count = st.text_input('White Blood Cell Count')
    with col3:
        red_blood_cell_count = st.text_input('Red Blood Cell Count')
    with col4:
        hypertension = st.text_input('Hypertension')
    with col5:
        diabetes_mellitus = st.text_input('Diabetes Mellitus')
    with col1:
        coronary_artery_disease = st.text_input('Coronary Artery Disease')
    with col2:
        appetite = st.text_input('Appetite')
    with col3:
        peda_edema = st.text_input('Pedal Edema')
    with col4:
        aanemia = st.text_input('Anaemia')

    kidney_disease_result = ""
    detailed_info = ""

    if st.button("Kidney's Test Result"):
        user_input = [
            age, blood_pressure, specific_gravity, albumin, sugar,
            red_blood_cells, pus_cell, pus_cell_clumps, bacteria,
            blood_glucose_random, blood_urea, serum_creatinine, sodium,
            potassium, haemoglobin, packed_cell_volume,
            white_blood_cell_count, red_blood_cell_count, hypertension,
            diabetes_mellitus, coronary_artery_disease, appetite,
            peda_edema, aanemia
        ]
        user_input = [float(x) for x in user_input]
        prediction = kidney_disease_model.predict([user_input])
        if prediction[0] == 1:
            kidney_disease_result = "The person has kidney disease."
            detailed_info = """
            **Kidney Disease Overview:**
            Chronic kidney disease (CKD) means your kidneys are damaged and can’t filter blood the way they should. 
            The disease is called “chronic” because the damage to your kidneys happens slowly over a long period of time. 
            This damage can cause wastes to build up in your body. CKD can also cause other health problems.

            **Management and Treatment:**
            1. **Lifestyle Changes:** Healthy eating, physical activity, and maintaining a healthy weight.
            2. **Medications:** Prescribed to control symptoms and manage complications.
            3. **Dialysis:** Required if kidneys fail to filter blood.
            4. **Kidney Transplant:** In severe cases, a transplant might be necessary.
            5. **Monitoring:** Regular check-ups to monitor kidney function and overall health.
            """
        else:
            kidney_disease_result = "The person does not have kidney disease."

    st.success(kidney_disease_result)
    if detailed_info:
        st.markdown(detailed_info)
