import Post from "./Post"

export const initialState = {
  currentStep: 2,
  data: {
    "id": "http://arxiv.org/abs/2002.00012v1",
    "title": "The Birth of a Massive First-Star Binary",
    "summary": "  We study the formation of massive Pop III binary stars using a newly\ndeveloped radiation hydrodynamics code with the adaptive mesh refinement and\nadaptive ray-tracing methods. We follow the evolution of a typical primordial\nstar-forming cloud obtained from a cosmological hydrodynamics simulation.\nSeveral protostars form as a result of disk fragmentation and grow in mass by\nthe gas accretion, which is finally quenched by the radiation feedback from the\nprotostars. Our code enables us, for the first time, to consider the feedback\nby both the ionizing and dissociating radiation from the multiple protostars,\nwhich is essential for self-consistently determining their final masses. At the\nfinal step of the simulation, we observe a very wide ($\\gtrsim\n10^4\\,\\mathrm{au}$) binary stellar system consisting of $60$ and $70\\,M_\\odot$\nstars. One of the member stars also has two smaller mass ($10\\,M_\\odot$)\ncompanion stars orbiting at $200$ and $800\\,\\mathrm{au}$, making up a\nmini-triplet system. Our results suggest that massive binary or multiple\nsystems are common among Pop III stars.\n",
    "authors": [
      {
        "name": [
          "Kazuyuki Sugimura"
        ]
      },
      {
        "name": [
          "Tomoaki Matsumoto"
        ]
      },
      {
        "name": [
          "Takashi Hosokawa"
        ]
      },
      {
        "name": [
          "Shingo Hirano"
        ]
      },
      {
        "name": [
          "Kazuyuki Omukai"
        ]
      }
    ],
    "links": [
      {
        "$": {
          "href": "http://arxiv.org/abs/2002.00012v1",
          "rel": "alternate",
          "type": "text/html"
        }
      },
      {
        "$": {
          "title": "pdf",
          "href": "http://arxiv.org/pdf/2002.00012v1",
          "rel": "related",
          "type": "application/pdf"
        }
      }
    ],
    "categories": [
      {
        "$": {
          "term": "astro-ph.GA",
          "scheme": "http://arxiv.org/schemas/atom"
        }
      },
      {
        "$": {
          "term": "astro-ph.HE",
          "scheme": "http://arxiv.org/schemas/atom"
        }
      },
      {
        "$": {
          "term": "astro-ph.SR",
          "scheme": "http://arxiv.org/schemas/atom"
        }
      }
    ]
  }
}

export const PostReducer = (state, { type, payload }) => {
  switch(type) {
    case PostReducer.actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PostReducer.actionTypes.SEARCH_SUCCESS:
      console.log('success', payload)
      return {
        ...state,
        isLoading: false,
        data: payload,
        currentStep: 1
      }
    case PostReducer.actionTypes.PERMINAFY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PostReducer.actionTypes.PERMINAFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentStep: 2
      }
    case PostReducer.actionTypes.GO_BACK:
      const { current } = state
      return {
        ...state,
        currentStep: current > 0 ? current  - 1 : 0
      }
    case PostReducer.actionTypes.RESET:
      return initialState
    default:
      return state
  }
}

PostReducer.actionTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  PERMINAFY_SUCCESS: 'PERMINAFY_SUCCESS',
  PERMINAFY_REQUEST: 'PERMINAFY_REQUEST',
  GO_BACK: 'GO_BACK',
  RESET: 'RESET'
}
