'use strict';
angular
  .module('core')
  .constant('ENV', 'MEM')
  .constant('_', window._)
  .constant('d3', window.d3)
  .constant('TreeModel', window.TreeModel)
  .constant('google', window.google)
  .constant('moment', window.moment)
  .constant('PROVINCES', {
    'ab': 'Alberta',
    'bc': 'British Columbia',
    'mb': 'Manitoba',
    'nb': 'New Brunswick',
    'nl': 'Newfoundland and Labrador',
    'ns': 'Nova Scotia',
    'on': 'Ontario',
    'pe': 'Prince Edward Island',
    'qc': 'Quebec',
    'sk': 'Saskatchewan',
    'nt': 'Northwest Territories',
    'nu': 'Nunavut',
    'yt': 'Yukon'
  })
  .constant('REGIONS', {
    'cariboo': 'Cariboo',
    'kootenay': 'Kootenay',
    'lower mainland': 'Lower Mainland',
    'okanagan': 'Okanagan',
    'omineca': 'Omineca',
    'peace': 'Peace',
    'skeena': 'Skeena',
    'thompson-nicola': 'Thompson-Nicola',
    'vancouver island': 'Vancouver Island',
    'central-northeast (prince george office)': 'Central-Northeast (Prince George Office)',
    'northwest (smithers office)': 'Northwest (Smithers Office)',
    'south central (kamloops office)': 'South Central (Kamloops Office)',
    'southeast (cranbrook office)': 'Southeast (Cranbrook Office)',
    'southwest (victoria office)': 'Southwest (Victoria Office)',
  })
  .constant('COMPANY_TYPES', {
    'private': 'Privately Owned',
    'public': 'Publically Traded',
  })
  .constant('TASK_STATUS', [
    'Not Required',
    'Not Started',
    'In Progress',
    'Complete'
  ])
  .constant('VC_ASSESSMENT_CATEGORIES', [
    'Environment',
    'Economic',
    'Social',
    'Heritage',
    'Health',
    'Other',
    'Requirements'
  ])
  .constant('VCTYPES', ['Valued Component',
    'Pathway Component'
  ])
  .constant('PILLARS', [
    'Environment',
    'Economic',
    'Social',
    'Heritage',
    'Health',
    'Other',
    'Requirements'
  ])
  .constant('PROJECT_CONDITION_PHASES', [
    'Pre-Construction',
    'Construction',
    'Operations',
    'Decommissioning'
  ])
  .constant('PROJECT_TYPES', [
    'Aggregate',
    'Coal',
    'Industrial Mineral',
    'Metal',
    'Sand & Gravel'
  ])
  .constant('PROJECT_COMMODITIES', [{
    type: 'Aggregate',
    commodities: [
      'Construction Aggregates'
    ]
  }, {
    type: 'Coal',
    commodities: [
      'Coal',
      'Thermal Coal'
    ]
  }, {
    type: 'Industrial Mineral',
    commodities: [
      'Asbestos',
      'Silica'
    ]
  }, {
    type: 'Metal',
    commodities: [
      'Cadmium (Cd)',
      'Copper (Cu)',
      'Gold (Au)',
      'Iron (Fe)',
      'Lead (Pb)',
      'Magnesium (Mg)',
      'Magnetite',
      'Mercury (Hg)',
      'Molybdenum (Mo)',
      'Muscovite (Mica)',
      'Nickel (Ni)',
      'Niobium (Nb)',
      'Silver (Ag)',
      'Zinc (Zn)'
    ]
  }, {
    type: 'Sand & Gravel',
    commodities: [
      'Sand & Gravel'
    ]
  }])
  .constant('PROJECT_ACTIVITY_STATUS', [
    'Active',
    'Complete',
    'Inactive',
    'Pending',
    'Suspended',
    'N/A'
  ])
  .constant('PROJECT_ACTIVITIES_DEFAULTS', [{
    name: 'Design',
    status: '',
    order: 0
  },
  {
    name: 'Construction',
    status: '',
    order: 1
  },
  {
    name: 'Operation',
    status: '',
    order: 2
  },
  {
    name: 'Closure',
    status: '',
    order: 3
  },
  {
    name: 'Reclamation',
    status: '',
    order: 4
  },
  {
    name: 'Monitoring & Reporting',
    status: '',
    order: 5
  }
  ])
  .constant('PROJECT_CONTENT_DEFAULTS', [{
    page: 'Auth',
    type: 'Intro',
    html: 'Environmental assessment certificates and permits issued under the Mines Act and the Environmental Management Act (EMA) are the primary provincial authorizations for major mine projects in British Columbia. Below you will find a list of authorizations associated with each of these three acts (as applicable).'
  }, {
    page: 'Comp',
    type: 'Intro',
    html: 'Compliance and enforcement (C&amp;E) activities begin after a claim is staked and continue through exploration and the life of a mine. The Ministry of Energy, Mines and Petroleum Resources (EMPR), Ministry of Environment and Climate Change Strategy (ENV) and Environmental Assessment Office (EAO) work together to provide integrated oversight of British Columbia&#39;s mining sector. Records of inspections conducted during the 2016 calendar year can be found below.'
  }, {
    page: 'Other',
    type: 'Intro',
    html: 'Below you will find recent annual reports (including annual reclamation reports, annual dam safety inspection reports and related documents) as well as other select documents of interest. More documents will be added here on an ongoing basis.'
  }])
  .constant('COLLECTION_TYPES', [
    'Annual Report',
    'Dam Safety Inspection',
    'Inspection Report',
    'Letter of Assurance',
    'Management Plan',
    'Order',
    'Permit',
    'Permit Amendment'
  ])
  .constant('CEAA_TYPES', [
    'None',
    'Comprehensive Study (Pre CEAA 2012)',
    'Cooperative (CEAA 2012)',
    'Cooperative (Pre CEAA 2012)',
    'Coordinated',
    'Equivalent (Provincial Lead)',
    'Equivalant (Federal Lead)',
    'Panel (CEAA 2012)',
    'Panel (Pre CEAA 2012)',
    'Screening (Pre CEAA 2012)',
    'Substituted (Federal Lead)',
    'Substituted (Provincial Lead)'
  ])
  .constant('CE_STAGES', [
    'Pre-Construction',
    'Construction',
    'Operations',
    'Decommissioning'
  ])
  .constant('DOCUMENT_TEMPLATE_TYPES', [
    'Project Description',
    'Schedule A',
    'Section 7(3) Order',
    'Section 10(1)(a) Order',
    'Section 10(1)(b) Order',
    'Section 10(1)(c) Order',
    'Section 11 Order',
    'Valued Component',
    'AIR',
    'Application',
    'Conditions List',
    'Section 34 Order',
    'Section 36 Order',
    'Environmental Assessment Certificate'
  ])
  .constant('COMMENT_REJECT', [
    'Unsuitable Language',
    'Quoting Third Parties',
    'Petitions',
    'Personally Identifying Information'
  ])
  .constant('PROJECT_ROLES', [{
    'code': 'project:staff',
    'name': 'Staff'
  },
  {
    'code': 'project:wg',
    'name': 'Working Group'
  },
  {
    'code': 'project:proponent',
    'name': 'Proponent'
  }
  ])
  .constant('PROJECT_STATUS', {
    'initiated': 'Initiated',
    'submitted': 'Submitted',
    'inprogress': 'In Progress',
    'certified': 'Certified',
    'decommissioned': 'Decommissioned'
  })
  .constant('PROJECT_STATUS_ARRAY', [
    'Initiated',
    'Submitted',
    'In Progress',
    'Certified',
    'Not Certified',
    'Decommissioned'
  ])
  .constant('PROJECT_STATUS_PUBLIC', {
    'inprogress': 'In Progress',
    'certified': 'Certified',
    'decommissioned': 'Decommissioned'
  })
  .constant('ENFORCEMENT_ACTIONS', [
    'Warning',
    'Order to Cease',
    'Order to Remedy',
    'Compliance Agreement',
    'Referral',
    'Other'
  ])
  .constant('ENFORCEMENT_STATUS', [
    'Open',
    'Resolved',
    'Recinded'
  ])
  .constant('PROJECT_DECISION', {
    'pre-ea-act-approval': 'Pre-EA Act Approval',
    'in-progress': 'In Progress',
    'certificate-not-required': 'Certificate Not Required',
    'further-assessment-required': 'Further Assessment Required',
    'certificate-issued': 'Certificate Issued',
    'certificate-refused': 'Certificate Refused',
    'terminated': 'Terminated',
    'withdrawn': 'Withdrawn'
  })
  // types with shortest length last
  .constant('INSPECTION_TYPES', ['Inspection Report Response', 'Inspection Report Follow Up', 'Inspection Report'])

  .constant('SALUTATIONS', ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Capt', 'Prof', 'Rev', 'Other'])
  .factory('codeFromTitle', function () {
    return function (title) {
      var s = title.toLowerCase();
      s = s.replace(/\W/g, '-');
      s = s.replace(/^-+|-+(?=-|$)/g, '');
      return s;
    };
  })
  .value('ProcessCodes', []);
